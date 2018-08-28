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
