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
