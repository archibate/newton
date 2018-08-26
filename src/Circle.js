N2.Circle = N2.Body.extend({

	ctor: function(option) {
		this._super(option);
		this.r = option.r;
		this.rSqr = this.r * this.r;
		this.invRotationalInteria = 2 * this.invMass / this.rSqr;
	},
});
