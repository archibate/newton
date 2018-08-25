N2.Vec2 = Class.extend({
	ctor: function(x, y) {
		this.x = x;
		this.y = y;
	},
	clone: function() {
		return new N2.Vec2(this.x, this.y);
	},
	lengthSqr: function() {
		return this.x * this.x + this.y * this.y;
	},
	length: function() {
		return Math.sqrt(this.lengthSqr());
	},
	normalize: function() {
		var inv = 1 / this.length();
		this.x *= inv;
		this.y *= inv;
		return this;
	},
	assign: function(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	},
	add: function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	addOfMultiplied: function(v, f) {
		this.x += v.x * f;
		this.y += v.y * f;
		return this;
	},
	sub: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	subOfMultiplied: function(v, f) {
		this.x -= v.x * f;
		this.y -= v.y * f;
		return this;
	},
	multiply: function(f) {
		this.x *= f;
		this.y *= f;
		return this;
	},
	dot: function(v) {
		return this.x * v.x + this.y * v.y;
	},
	cross: function(v) {
		return this.x * v.y + this.y * v.x;
	},
	angle: function(v) {
		return Math.acos(this.dot(v) / (this.length() * v.length()));
	},
	distanceSquare: function(x, y) {
		return this.x * x + this.y * y;
	},
});
