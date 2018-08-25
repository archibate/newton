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
	add: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	addOfMultiplied: function(v, f) {
		this.x += v.x * f;
		this.y += v.y * f;
		return this;
	},
	sub: function(v) {
		this.x -= v.x;
		this.y -= v.y;
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
		return this.x * v.y + this.y * v.x;
	},
	angle: function(v) {
		return Math.acos(this.dot(v) / (this.length() * v.length()));
	},
	distanceSquare: function(x, y) {
		return this.x * x + this.y * y;
	},
});
N2.World = Class.extend({

	ctor: function() {
		this.bodies = [];
		this.timeStep = 1/60;
		this.onTicks = [];
	},

	start: function() {
		N2.Ticker(function(dt) {
			this.tick(dt);
			this.start(dt);
		}.bind(this), this.timeStep);
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
(function() {
	var lastTime = 0;
	N2.Ticker = function(callback, timeStep) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0,
			timeStep * 1000 - (currTime - lastTime));
		currTime += timeToCall;
		var id = window.setTimeout(function() {
			callback(timeStep);
		}, timeToCall);
		lastTime = currTime;
		return id;
	};
}());
N2.DefaultGravity = new N2.Vec2(0, 80);

N2.Body = Class.extend({

	ctor: function(option) {
		this.position = new N2.Vec2(0, 0);
		this.mass = 0;
		this.velocity = new N2.Vec2(0, 0);
		this.rotation = 0;
		this.angularVelocity = 0;

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
		this.velocity.addOfMultiplied(impulse, this.invMass);
		this.angularVelocity += this.invRotationalInertia * rA.cross(impulse);
		/*if (rA.x != 0 || rA.y != 0) {
			var nv = rA.clone().normalize();
			var tangent = new N2.Vec2(nv.y, -nv.x);

			this.velocity.addOfMultiplied(nv, nv.dot(impulse) * this.invMass);

			var tni = tangent.multiply(tangent.dot(impulse));
			this.velocity.addOfMultiplied(tni, this.invMass);

			this.angularVelocity += rA.cross(tni) * this.invRotationInertia;
		} else {
			this.velocity.addOfMultiplied(impulse, this.invMass);
		}*/
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
		this.invRotationalInteria = 2 / (this.mass * this.rSqr);
	},
});
N2.Rect = N2.Body.extend({

	ctor: function(option) {
		this._super(option);
		this.size = option.size;
		this.sizeSqr = this.size.lengthSqr();
		this.invRotationalInertia = 12 / (this.mass * this.sizeSqr);
	},
});
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
