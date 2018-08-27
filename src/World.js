N2.World = Class.extend({

	ctor: function(option) {
		this.bodies = [];
		this.timeStep = 1/60;
		this.onTicks = [];
		this.ticker = new N2.Ticker();
		this.gravity = new N2.Vec2(0, 300);

		option |= {};
		for (var key in option) {
			if (option.hasOwnProperty(key)
				&& this.hasOwnProperty(key)) {
				this[key] = option[key];
			}
		}
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
		body.force = this.gravity.clone().multiply(body.mass);
		this.bodies.push(body);
	},

	onTick: function(callback) {
		this.onTicks.push(callback);
	},
});
