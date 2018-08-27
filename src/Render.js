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
