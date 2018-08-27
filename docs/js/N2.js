/*!
 * N2.js v0.0.1
 * (c) 2018 Peng Yubin
 */
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ?
		module.exports = factory() :
		typeof define === 'function' && define.amd ?
		define(factory) : (global.N2 = factory());
})(this, (function () {
	var N2 = {};
var Class = function() {};

Class.extend = function(prop) {
	var _super = this.prototype;
	var prototype = Object.create(this.prototype);
	for (var name in prop) {
		prototype[name] = name === 'ctor' ?
			(function(name, fn) {
				return function() {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			})(name, prop[name]) : prop[name];
	}

	function Class() {
		Class.prototype.ctor.apply(this, arguments);
	}

	Class.prototype = prototype;
	Class.prototype._super = Object.create(this.prototype);
	Class.prototype.constructor = Class;
	Class.extend = arguments.callee;

	return Class;
};
N2.Vec2 = Class.extend({
	ctor: function(x, y) {
		this.x = x;
		this.y = y;
	},
	clone: function() {
		return new N2.Vec2(this.x, this.y);
	},
	lengthSqr: function() {
		return this.x * this.x + this.y * this.y;
	},
	length: function() {
		return Math.sqrt(this.lengthSqr());
	},
	normalize: function() {
		var inv = 1 / this.length();
		this.x *= inv;
		this.y *= inv;
		return this;
	},
	assign: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	},
	rotatedCCW: function() {
		return new N2.Vec2(-this.y, this.x);
	},
	rotatedCW: function() {
		return new N2.Vec2(this.y, -this.x);
	},
	add: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	sub: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	addOfMultiplied: function(v, f) {
		this.x += v.x * f;
		this.y += v.y * f;
		return this;
	},
	subOfMultiplied: function(v, f) {
		this.x -= v.x * f;
		this.y -= v.y * f;
		return this;
	},
	multiply: function(f) {
		this.x *= f;
		this.y *= f;
		return this;
	},
	dot: function(v) {
		return this.x * v.x + this.y * v.y;
	},
	cross: function(v) {
		return this.x * v.y - this.y * v.x;
	},
	angle: function(v) {
		return Math.acos(this.dot(v) / (this.length() * v.length()));
	},
	distanceSquare: function(x, y) {
		return this.x * x + this.y * y;
	},
});

N2.polarCCW = function(angle) {
	return new N2.Vec2(Math.cos(angle), Math.sin(angle));
};

N2.polarCW = function(angle) {
	return new N2.Vec2(Math.cos(angle),-Math.sin(angle));
};
N2.World = Class.extend({

	ctor: function() {
		this.bodies = [];
		this.timeStep = 1/60;
		this.onTicks = [];
		this.ticker = new N2.Ticker();
	},

	start: function() {
		this.timer = this.ticker.timeout(function(dt) {
			this.tick(dt);
			if (this.timer)
				this.start();
		}.bind(this), this.timeStep);
	},

	pause: function() {
		this.ticker.pause(this.timer);
		this.timer = undefined;
	},

	tick: function(dt) {
		for (var k in this.bodies) {
			var body = this.bodies[k];
			body.tick(dt);
		}
		for (var i in this.onTicks) {
			this.onTicks[i](dt);
		}
	},

	add: function(body) {
		this.bodies.push(body);
	},

	onTick: function(callback) {
		this.onTicks.push(callback);
	},
});
N2.Ticker = Class.extend({
	ctor: function() {
		this.lastTime = 0;
	},

	timeout: function(callback, timeStep) {
		var currTime = new Date().getTime();
		var timeToCall = timeStep * 1000 - currTime + this.lastTime;
		currTime += Math.max(0, timeToCall);
		var id = window.setTimeout(function() {
			callback(timeStep);
		}, timeToCall);
		this.lastTime = currTime;
		return id;
	},

	pause: function(id)
	{
		window.clearTimeout(id);
	},
});
N2.AABB = Class.extend({

	ctor: function(l, t, r, b) {
		this.l = l;
		this.t = t;
		this.r = r;
		this.b = b;
	},

	// https://www.ibm.com/developerworks/cn/web/wa-build2dphysicsengine/
	doesCollide: function(c) {
		return  !( this.b < c.t || this.t > c.b
			|| this.r < c.l || this.l > c.r
			);
	},
});
N2.DefaultGravity = new N2.Vec2(0, 300);

N2.Body = Class.extend({

	ctor: function(option) {
		this.position = new N2.Vec2(0, 0);
		this.mass = 0;
		this.velocity = new N2.Vec2(0, 0);
		this.rotation = 0;
		this.angularVelocity = 0;
		this.invRotationalInertia = 0;

		for (var key in option) {
			if (option.hasOwnProperty(key)
				&& this.hasOwnProperty(key)) {
				this[key] = option[key];
			}
		}

		this.force = N2.DefaultGravity.clone().multiply(this.mass);

		if (this.mass != 0) {
			this.invMass = 1 / this.mass;
		} else {
			this.invMass = 0;
		}
	},

	applyImpulse: function(impulse, point) {
		var rA = point.clone().sub(this.position);
		this.angularVelocity += rA.cross(impulse) * this.invRotationalInertia;
		this.velocity.addOfMultiplied(impulse, this.invMass);
	},

	getSCAAt: function(p, n)
	{
		// SCA := (rA^n)**2 / J + 1 / M
		var rA = p.clone().sub(this.position);
		var rCn = rA.cross(n);
		return rCn * rCn * this.invRotationalInertia + this.invMass;
	},

	getVelocityAt: function(p)
	{
		var rA = p.clone().sub(this.position);
		var rv = rA.rotatedCCW().multiply(this.angularVelocity);
		return rv.add(this.velocity);
	},
	
	intergrateVelocity: function(dt) {
		this.velocity.add(this.force.clone().multiply(this.invMass * dt));
	},
	
	intergratePosition: function(dt) {
		this.position.add(this.velocity.clone().multiply(dt));
	},
	
	intergrateRotation: function(dt) {
		this.rotation += this.angularVelocity * dt;
	},

	tick: function(dt) {
		this.intergrateVelocity(dt);
		this.intergratePosition(dt);
		this.intergrateRotation(dt);
	},
});
N2.Circle = N2.Body.extend({

	ctor: function(option) {
		this._super(option);
		this.r = option.r;
		this.rSqr = this.r * this.r;
		this.invRotationalInteria = 2 * this.invMass / this.rSqr;
	},
});
N2.Rect = N2.Body.extend({

	ctor: function(option) {
		this._super(option);
		this.size = option.size;
		this.halfsize = this.size.clone().multiply(0.5);
		this.sizeSqr = this.size.lengthSqr();
		this.invRotationalInertia = 12 * this.invMass / this.sizeSqr;
		this.rotationalInertia = 1 / this.invRotationalInertia;
	},

	getAABB: function()
	{
		var lt = this.position.clone().sub(this.halfsize);
		var rb = this.position.clone().add(this.halfsize);
		return new N2.AABB(lt.x, lt.y, rb.x, rb.y);
	},

	getNormalAt: function(p)
	{
		var rA = p.clone().sub(this.position);
		var n = new N2.polarCCW(this.rotation);

		if (Math.abs(rA.dot(n)) <= this.halfsize.x)
			return n;
	},

	getVertices: function()
	{
		var bx = N2.polarCCW(this.rotation);
		var by = bx.rotatedCCW();
		var dx = bx.multiply(this.halfsize.x);
		var dy = by.multiply(this.halfsize.y);
		var ax = this.position.clone().add(dx);
		var sx = this.position.clone().sub(dx);
		return [
			ax.clone().add(dy), ax.sub(dy),
			sx.clone().add(dy), sx.sub(dy),
		];
	},
});
(function() {
	N2.Collide = {
		react_Vertiable_NormableStatic: function(a, b)
		{
			var vertices = a.getVertices();
			for (var i in vertices) {
				var point = vertices[i];
				var n = b.getNormalAt(point);
				if (n === undefined)
					continue;
				// w += rA^I / J
				// v += I / M
				// what we want is:
				// rA^n * w + v.n = 0
				// i.e.:
				// rA^n * (w + rA^I / J) + (v + I / M).n == 0
				// rA^n * rA^I / J + I.n / M == -(rA^n * w + v.n)
				// supp I = |I| n
				// (rA^n)**2 |I| / J + |I| / M == -(rA^n * w + v.n)
				// [(rA^n)**2 / J + 1 / M] |I| == -(rA^n * w + v.n)
				// |I| == -(rA^n * w + v.n) / [(rA^n)**2 / J + 1 / M]
				// throughts above all by original
				var k = 0.9; // 0: full sticky, 1: full bounce, must 0<=k<=1
				var rsca = -(1+k) / a.getSCAAt(point, n);
				var imp = a.getVelocityAt(point).dot(n) * rsca;
				if (imp < 0)
					continue;
				var impulse = n.multiply(imp);
				a.applyImpulse(impulse, point);
			}
		},
	};
})();
N2.Render = Class.extend({

	ctor: function (selector) {
		this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext("2d");
	},

	clear: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	circle: function(x, y, r, rotation) {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.setTransform(Math.cos(rotation), Math.sin(rotation),
			             -Math.sin(rotation), Math.cos(rotation),
				      x, y);
		this.ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
		this.ctx.lineTo(0, 0)
		this.ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
		this.ctx.stroke();
		this.ctx.restore();
	},

	rect: function(x, y, w, h, rotation) {
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.setTransform(Math.cos(rotation), Math.sin(rotation),
				     -Math.sin(rotation), Math.cos(rotation),
				      x, y);
		this.ctx.strokeRect(-w / 2, -h / 2, w, h);
		this.ctx.beginPath();
		this.ctx.moveTo(w / 2, 0);
		this.ctx.lineTo(0, 0);
		this.ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.restore();
	}
});
	return N2;
}));
