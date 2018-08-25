N2.AABB = Class.extend({

	ctor: function(l, t, r, b) {
		this.l = l;
		this.t = t;
		this.r = r;
		this.b = b;
	},

	collide: function(c) {
		// https://www.ibm.com/developerworks/cn/web/wa-build2dphysicsengine/
		return this.b < c.t || this.t > c.b || this.r < c.l || this.l > c.r;
	},
});
