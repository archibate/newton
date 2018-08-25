(function() {
	var lastTime = 0;
	N2.collideAABB = function(c1, c2) {
		return c1.b < c2.t || c1.t > c2.b || c1.r < c2.l || c1.l > c2.r;
	};
}());
