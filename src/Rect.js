N2.Rect = N2.Body.extend({

	ctor: function(option) {
		this._super(option);
		this.size = option.size;
		this.sizeSqr = this.size.lengthSqr();
		this.invRotationalInertia = 12 / (this.mass * this.sizeSqr);
	},
});
