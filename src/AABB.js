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
