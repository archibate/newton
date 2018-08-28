/**
 * N2.js, a 2d rigid-body physics engine written in javascript ES6.
 * @module
 */
/**
 * Class representing a (2d) vector, and a point.
 */
class Vec2 {
	/**
	 * Create a vector.
	 * @param {number} x - The x coordinate.
	 * @param {number} y - The y coordinate.
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	/**
	 * Clone this vector a new instance.
	 * @return {Vec2} The cloned vector.
	 */
	clone() {
		return new Vec2(this.x, this.y);
	}
	/**
	 * @return {number} The squared length.
	 */
	lengthSqr() {
		return this.x * this.x + this.y * this.y;
	}
	/**
	 * @return {number} The length of vector.
	 */
	length() {
		return Math.sqrt(this.lengthSqr());
	}
	/**
	 * Normalize the vector.
	 * @return {Vec2} Instance of this.
	 */
	normalize() {
		var inv = 1 / this.length();
		this.x *= inv;
		this.y *= inv;
		return this;
	}
	/**
	 * Assign with another vector.
	 * @return {Vec2} Instance of this.
	 */
	assign(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	/**
	 * rotate counter clock wise with 90 degrees.
	 * @return {Vec2} Rotated result.
	 */
	rotatedCCW() {
		return new Vec2(-this.y, this.x);
	}
	/**
	 * rotate clock wise with 90 degrees.
	 * @return {Vec2} Rotated result.
	 */
	rotatedCW() {
		return new Vec2(this.y, -this.x);
	}
	/**
	 * Add another vector to this.
	 * @param {Vec2} v - another vector.
	 * @return {Vec2} Instance of this.
	 */
	add(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	/**
	 * Subtract another vector from this.
	 * @param {Vec2} v - another vector.
	 * @return {Vec2} Instance of this.
	 */
	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	/**
	 * Same as this.add(v.multiply(f)).
	 * @param {Vec2} v - another vector.
	 * @param {number} f - the scale of another vector.
	 * @return {Vec2} Instance of this.
	 */
	addOfMultiplied(v, f) {
		this.x += v.x * f;
		this.y += v.y * f;
		return this;
	}
	/**
	 * Same as this.sub(v.multiply(f)).
	 * @param {Vec2} v - another vector.
	 * @param {number} f - the scale of another vector.
	 * @return {Vec2} Instance of this.
	 */
	subOfMultiplied(v, f) {
		this.x -= v.x * f;
		this.y -= v.y * f;
		return this;
	}
	/**
	 * Multiply a scalar to this vector.
	 * @param {number} f - the scalar.
	 * @return {Vec2} Instance of this.
	 */
	multiply(f) {
		this.x *= f;
		this.y *= f;
		return this;
	}
	/**
	 * Calculate the dot product with another vector.
	 * @param {number} v - another vector.
	 * @return {number} The dot product.
	 */
	dot(v) {
		return this.x * v.x + this.y * v.y;
	}
	/**
	 * Calculate the (2d) cross product with another vector.
	 * @param {number} v - another vector.
	 * @return {number} The (2d) cross product.
	 */
	cross(v) {
		return this.x * v.y - this.y * v.x;
	}
	/**
	 * Calculate the angle between this and another vector.
	 * @param {number} v - another vector.
	 * @return {number} The angle between them.
	 */
	angle(v) {
		return Math.acos(this.dot(v) / (this.length() * v.length()));
	}
	/**
	 * Calculate the squared distance between two point (i.e. vector).
	 * @param {number} v - another point (vector).
	 * @return {number} The squared distance.
	 */
	distanceSqr(v) {
		return this.x * v.x + this.y * v.y;
	}
	/**
	 * Calculate the distance between two point (i.e. vector).
	 * @param {number} v - another point (vector).
	 * @return {number} The distance between them.
	 */
	distance(v) {
		return Math.sqrt(this.distanceSqr());
	}
}

/**
 * Calculate the counter clock wise rotated (1,0)
 * @param {number} angle - the angle, (positive for CCW)
 * @return {Vec2} (cos(angle), sin(angle))
 */
function polarCCW(angle) {
	return new Vec2(Math.cos(angle), Math.sin(angle));
}

/**
 * Calculate the counter clock wise rotated (1,0)
 * @param {number} angle - the angle, (positive for CW)
 * @return {Vec2} (cos(angle),-sin(angle))
 */
function polarCW(angle) {
	return new Vec2(Math.cos(angle),-Math.sin(angle));
}

exports.Vec2 = Vec2;
exports.polarCCW = polarCCW;
exports.polarCW = polarCW;
/**
 * Class representing a World.
 * Contain multiple, variable of bodies.
 */
class World {
	constructor(option) {
		this.bodies = [];
		this.timeStep = 1/60;
		this.splitSteps = 2;
		this.onTicks = [];
		this.ticker = new Ticker();
		this.getGravity = function(p) {
			return new Vec2(0, 300);
		};

		option |= {};
		for (var key in option) {
			if (option.hasOwnProperty(key)
				&& this.hasOwnProperty(key)) {
				this[key] = option[key];
			}
		}
	}

	/**
	 * Start acting the world by time.
	 */
	start() {
		this.timer = -1;
		this.timer = this.ticker.timeout(function(dt) {
			this.tick(dt);
			if (this.timer)
				this.start();
		}.bind(this), this.timeStep);
	}

	/**
	 * Pause the world.
	 */
	pause() {
		this.ticker.cancel(this.timer);
		this.timer = undefined;
	}

	/**
	 * Timer tick callback.
	 * @param {number} dt - Time passed.
	 */
	tick(dt) {
		for (var i = 0; i < this.splitSteps; i++) {
			for (var k in this.bodies) {
				var body = this.bodies[k];
				body.tick(dt / this.splitSteps);
			}
		}
		for (var i in this.onTicks) {
			this.onTicks[i](dt);
		}
	}

	/**
	 * Add a body to the current world.
	 * @param {Body} body - The body to add.
	 */
	add(body) {
		body.getGravity = this.getGravity.bind(this);
		this.bodies.push(body);
	}

	/**
	 * Set timer tick callback.
	 * @param {function} callback - Called on an timer tick().
	 */
	onTick(callback) {
		this.onTicks.push(callback);
	}
}

exports.World = World;
/**
 * Class to control timer ticks.
 */
class Ticker {
	constructor() {
		this.lastTime = 0;
	}

	/**
	 * Set a timeout callback.
	 * @param {function} callback - Called when timeStep passed.
	 * @param {function} timeStep - How long to call.
	 * @returns {number} The timer id.
	 */
	timeout(callback, timeStep) {
		var currTime = new Date().getTime();
		var timeToCall = timeStep * 1000 - currTime + this.lastTime;
		currTime += Math.max(0, timeToCall);
		var id = window.setTimeout(function() {
			callback(timeStep);
		}, timeToCall);
		this.lastTime = currTime;
		return id;
	}

	/**
	 * Cancel the given timer.
	 * @param {number} The timer id.
	 */
	cancel(id) {
		window.clearTimeout(id);
	}
}

exports.Ticker = Ticker;
/**
 * Class representing an AABB box.
 * Use for pre-collision detect. (uncompleted)
 */
class AABB {
	constructor(l, t, r, b) {
		this.l = l;
		this.t = t;
		this.r = r;
		this.b = b;
	}

	// https://www.ibm.com/developerworks/cn/web/wa-build2dphysicsengine/
	doesCollide(c) {
		return  !( this.b < c.t || this.t > c.b
			|| this.r < c.l || this.l > c.r
			);
	}
}
/**
 * Class representing a rigid body.
 */
class Body {
	constructor(option) {
		this.position = new Vec2(0, 0);
		this.mass = 0;
		this.velocity = new Vec2(0, 0);
		this.rotation = 0;
		this.angularVelocity = 0;
		this.invRotationalInertia = 0;
		this.acceleration = new Vec2(0, 0);

		for (var key in option) {
			if (option.hasOwnProperty(key)
				&& this.hasOwnProperty(key)) {
				this[key] = option[key];
			}
		}

		if (this.mass != 0) {
			this.invMass = 1 / this.mass;
		} else {
			this.invMass = 0;
		}
	}

	/**
	 * Apply an impulse on a specific point.
	 * @param {Vec2} impulse - the impulse vector.
	 * @param {Vec2} point - the point it acts.
	 */
	applyImpulse(impulse, point) {
		var rA = point.clone().sub(this.position);
		this.angularVelocity += rA.cross(impulse) * this.invRotationalInertia;
		this.velocity.addOfMultiplied(impulse, this.invMass);
	}

	getSCAAt(p, n)
	{
		// SCA := (rA^n)**2 / J + 1 / M
		var rA = p.clone().sub(this.position);
		var rCn = rA.cross(n);
		return rCn * rCn * this.invRotationalInertia + this.invMass;
	}

	getVelocityAt(p)
	{
		var rA = p.clone().sub(this.position);
		var rv = rA.rotatedCCW().multiply(this.angularVelocity);
		return rv.add(this.velocity);
	}
	
	intergrateVelocity(dt) {
		if (this.invMass)
			this.velocity.add(this.getGravity(this).multiply(dt));
	}
	
	intergratePosition(dt) {
		this.position.add(this.velocity.clone().multiply(dt));
	}
	
	intergrateRotation(dt) {
		this.rotation += this.angularVelocity * dt;
	}

	/**
	 * Timer tick callback.
	 * @param {number} dt - Time passed.
	 */
	tick(dt) {
		this.intergrateVelocity(dt);
		this.intergratePosition(dt);
		this.intergrateRotation(dt);
	}
}

exports.Body = Body;
/**
 * A kind of rigid-body: a circle (i.e. 2d ball).
 * @extends Body
 */
class Circle extends Body {
	constructor(option) {
		super(option);
		this.r = option.r;
		this.rSqr = this.r * this.r;
		this.invRotationalInteria = 2 * this.invMass / this.rSqr;
	}
}

exports.Circle = Circle;
/**
 * A kind of rigid-body: a rectangle.
 * @extends Body
 */
class Rect extends Body {
	constructor(option) {
		super(option);
		this.size = option.size;
		this.halfsize = this.size.clone().multiply(0.5);
		this.sizeSqr = this.size.lengthSqr();
		this.invRotationalInertia = 12 * this.invMass / this.sizeSqr;
		this.rotationalInertia = 1 / this.invRotationalInertia;
	}

	getAABB()
	{
		var lt = this.position.clone().sub(this.halfsize);
		var rb = this.position.clone().add(this.halfsize);
		return new AABB(lt.x, lt.y, rb.x, rb.y);
	}

	getNormalAt(p)
	{
		var rA = p.clone().sub(this.position);
		var n = new polarCCW(this.rotation);

		if (Math.abs(rA.dot(n)) <= this.halfsize.x)
			return n;
	}

	getVertices()
	{
		var bx = polarCCW(this.rotation);
		var by = bx.rotatedCCW();
		var dx = bx.multiply(this.halfsize.x);
		var dy = by.multiply(this.halfsize.y);
		var ax = this.position.clone().add(dx);
		var sx = this.position.clone().sub(dx);
		return [
			ax.clone().add(dy), ax.sub(dy),
			sx.clone().add(dy), sx.sub(dy),
		];
	}
}

exports.Rect = Rect;
/**
 * Collision functions
 */
exports.Collide = {
	/**
	 * Collide Circle vs Circle
	 * @param {Circle} a
	 * @param {Circle} b
	 */
	react_Circle_Circle: function(a, b)
	{
		var d = b.position.clone().sub(a.position);
		var distance = d.length();
		if (distance <= a.r + b.r) {
			var rdis = 1 / distance;
			var v = b.velocity.clone().sub(a.velocity);
			var von = v.dot(d) * rdis / v.length();
			if (von <= 0) {
				v.multiply(von);
				b.applyImpulse(v.clone().multiply(a.mass),
					d.clone().multiply(-b.r * rdis).add(b.position));
				a.applyImpulse(v.multiply(-b.mass),
					d.multiply(a.r * rdis).add(a.position));
			}
		}
	},

	/**
	 * Collide  Vertiable  vs  Normable & Static Body
	 * @param {Body} a - hasAttr getVertices
	 * @param {Body} b - hasAttr getNormalAt, and static
	 */
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
/**
 * The class used to render objects on canvas.
 */
class Render {
	/**
	 * Create a render instance.
	 * @param {string} selector - The query selector.
	 */
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext('2d');
	}

	/**
	 * Clear the canvas.
	 */
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Draw a circle.
	 * @param {number} x - The x cooridate of center.
	 * @param {number} y - The y cooridate of center.
	 * @param {number} r - The radius of the circle.
	 * @param {number} rotation - The rotated angle of the circle.
	 */
	circle(x, y, r, rotation) {
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
	}

	/**
	 * Draw a rectangle.
	 * @param {number} x - The x cooridate of center.
	 * @param {number} y - The y cooridate of center.
	 * @param {number} w - The width of the rectangle.
	 * @param {number} h - The height of the rectangle.
	 * @param {number} rotation - The rotated angle of the rectangle.
	 */
	rect(x, y, w, h, rotation) {
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
}

exports.Render = Render;
