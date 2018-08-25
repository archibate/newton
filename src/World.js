N2.World = Class.extend({

	ctor: function() {
		this.bodies = [];
		this.timeStep = 1/60;
		this.onTicks = [];
	},

	start: function() {
		N2.Ticker(function(dt) {
			this.tick(dt);
			this.start(dt);
		}.bind(this), this.timeStep);
	},

	tick: function(dt) {
		for (var k in this.bodies) {
			var body = this.bodies[k];
			body.tick(dt);
		}
		for (var i in this.onTicks) {
			this.onTicks[i](dt);
		}
	},

	add: function(body) {
		this.bodies.push(body);
	},

	onTick: function(callback) {
		this.onTicks.push(callback);
	},
});
