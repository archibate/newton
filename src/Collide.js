(function() {
	N2.Collide = {
		react_Vertiable_NormableStatic: function(a, b)
		{
			var vertices = a.getVertices();
			for (var i in vertices) {
				var point = vertices[i];
				var n = b.getNormalAt(point);
				if (n === undefined)
					continue;
				// w += rA^I / J
				// v += I / M
				// what we want is:
				// rA^n * w + v.n = 0
				// i.e.:
				// rA^n * (w + rA^I / J) + (v + I / M).n == 0
				// rA^n * rA^I / J + I.n / M == -(rA^n * w + v.n)
				// supp I = |I| n
				// (rA^n)**2 |I| / J + |I| / M == -(rA^n * w + v.n)
				// [(rA^n)**2 / J + 1 / M] |I| == -(rA^n * w + v.n)
				// |I| == -(rA^n * w + v.n) / [(rA^n)**2 / J + 1 / M]
				// throughts above all by original
				var k = 0.9; // 0: full sticky, 1: full bounce, must 0<=k<=1
				var rsca = -(1+k) / a.getSCAAt(point, n);
				var imp = a.getVelocityAt(point).dot(n) * rsca;
				if (imp < 0)
					continue;
				var impulse = n.multiply(imp);
				a.applyImpulse(impulse, point);
			}
		},
	};
})();
