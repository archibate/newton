/**
 * Class to control timer ticks.
 */
class Ticker {
	constructor() {
		this.lastTime = 0;
	}

	/**
	 * Set a timeout callback.
	 * @param {function} callback - Called when timeStep passed.
	 * @param {function} timeStep - How long to call.
	 * @returns {number} The timer id.
	 */
	timeout(callback, timeStep) {
		var currTime = new Date().getTime();
		var timeToCall = timeStep * 1000 - currTime + this.lastTime;
		currTime += Math.max(0, timeToCall);
		var id = window.setTimeout(function() {
			callback(timeStep);
		}, timeToCall);
		this.lastTime = currTime;
		return id;
	}

	/**
	 * Cancel the given timer.
	 * @param {number} The timer id.
	 */
	cancel(id)
	{
		window.clearTimeout(id);
	}
}

exports.Ticker = Ticker;
