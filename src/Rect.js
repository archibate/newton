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
