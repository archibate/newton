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
};

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
