N2.World = Class.extend({

	ctor: function() {
		this.bodies = [];
		this.timeStep = 1/60;
		this.onTicks = [];
		this.ticker = new N2.Ticker();
	},

	start: function() {
		this.timer = this.ticker.timeout(function(dt) {
			this.tick(dt);
			if (this.timer)
				this.start();
		}.bind(this), this.timeStep);
	},

	pause: function() {
		this.ticker.pause(this.timer);
		this.timer = undefined;
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
