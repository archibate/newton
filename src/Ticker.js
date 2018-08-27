N2.Ticker = Class.extend({
	ctor: function() {
		this.lastTime = 0;
	},

	timeout: function(callback, timeStep) {
		var currTime = new Date().getTime();
		var timeToCall = timeStep * 1000 - currTime + this.lastTime;
		currTime += Math.max(0, timeToCall);
		var id = window.setTimeout(function() {
			callback(timeStep);
		}, timeToCall);
		this.lastTime = currTime;
		return id;
	},

	pause: function(id)
	{
		window.clearTimeout(id);
	},
});
