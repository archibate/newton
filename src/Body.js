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
	 * Apply a linear constraint on a specific point on object.
	 * Will make the object velocity.dot(n) = 0 at that point.
	 * @param {Vec2} point - the point of static.
	 * @param {Vec2} n - the constraint line's normal.
	 * @param {boolean} side - whether to constraint only the n directed side.
	 * @param {number} k - the bounceness, default to 0.
	 * @returns {boolean} true if impulse was applied.
	 */
	applyLinearConstraint(point, n, side, k) {
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
		// k=0: full sticky, k=1: full bounce, must 0<=k<=1
		var rsca = -(1 + (k||0)) / this.getSCAAt(point, n);
		var imp = this.getVelocityAt(point).dot(n) * rsca;
		if (side && imp < 0)
			return false;
		var impulse = n.clone().multiply(imp);
		this.applyImpulse(impulse, point);
		this.constraintNormal = n;
		return true;
	}

	/**
	 * Apply a circular constraint on the center of the object.
	 * Will make this point's distance to center constant (or '<=' when side=true).
	 * @param {Vec2} center - the center of circular constraint.
	 * @param {boolean} side - whether to constraint only to the inner side.
	 * @param {number} k - the bounceness, default to 0.
	 * @returns {boolean} true if impulse was applied.
	 */
	applyCenteredCircularConstraint(center, side, k)
	{
		var n = center.clone().sub(this.position).normalize();
		return this.applyLinearConstraint(this.position, n, side, k);
	}

	fixCenteredCircularConstraint(center, distance)
	{
		var d = center.clone().sub(this.position);
		this.position.add(d.multiply(1 - distance / d.length()));
	}

	/**
	 * Apply an impulse on a specific point on object.
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
		if (this.invMass) {
			var g = this.getGravity(this);
			/*if (this.constraintNormal) {
				var p = g.projected(this.constraintNormal);
				this.constraintNormal = undefined;
			}*/
			this.velocity.add(g.multiply(dt));
		}
	}
	
	intergratePosition(dt) {
		this.position.add(this.velocity.clone().multiply(dt));
	}
	
	intergrateRotation(dt) {
		this.rotation += this.angularVelocity * dt;
	}

	/**
	 * Time step callback.
	 * @param {number} dt - Time passed.
	 */
	step(dt) {
		this.intergratePosition(dt);
		this.intergrateRotation(dt);
		this.intergrateVelocity(dt);
	}
}

exports.Body = Body;
