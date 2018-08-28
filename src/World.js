/**
 * Class representing a World.
 * Contain multiple, variable of bodies.
 */
class World {
	constructor(option) {
		this.bodies = [];
		this.timeStep = 1/60;
		this.splitSteps = 2;
		this.onTicks = [];
		this.ticker = new Ticker();
		this.getGravity = function(p) {
			return new Vec2(0, 300);
		};

		option |= {};
		for (var key in option) {
			if (option.hasOwnProperty(key)
				&& this.hasOwnProperty(key)) {
				this[key] = option[key];
			}
		}
	}

	/**
	 * Start acting the world by time.
	 */
	start() {
		this.timer = -1;
		this.timer = this.ticker.timeout(function(dt) {
			this.tick(dt);
			if (this.timer)
				this.start();
		}.bind(this), this.timeStep);
	}

	/**
	 * Pause the world.
	 */
	pause() {
		this.ticker.cancel(this.timer);
		this.timer = undefined;
	}

	/**
	 * Timer tick callback.
	 * @param {number} dt - Time passed.
	 */
	tick(dt) {
		for (var i = 0; i < this.splitSteps; i++) {
			for (var k in this.bodies) {
				var body = this.bodies[k];
				body.tick(dt / this.splitSteps);
			}
		}
		for (var i in this.onTicks) {
			this.onTicks[i](dt);
		}
	}

	/**
	 * Add a body to the current world.
	 * @param {Body} body - The body to add.
	 */
	add(body) {
		body.getGravity = this.getGravity.bind(this);
		this.bodies.push(body);
	}

	/**
	 * Set timer tick callback.
	 * @param {function} callback - Called on an timer tick().
	 */
	onTick(callback) {
		this.onTicks.push(callback);
	}
}

exports.World = World;
