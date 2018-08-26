(function() {
	var lastTime = 0;
	N2.Ticker = function(callback, timeStep) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0,
			timeStep * 1000 - (currTime - lastTime));
		currTime += timeToCall;
		var id = window.setTimeout(function() {
			callback(timeStep);
		}, timeToCall);
		lastTime = currTime;
		return id;
	};
})();
