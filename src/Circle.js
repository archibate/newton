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
