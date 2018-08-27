exports.Collide = {
	/**
	 * Collide Circle vs Circle
	 * @param {Circle} a
	 * @param {Circle} b
	 */
	react_Circle_Circle: function(a, b)
	{
		var d = b.position.clone().sub(a.position);
		var distance = d.length();
		if (distance <= a.r + b.r) {
			var rdis = 1 / distance;
			var v = b.velocity.clone().sub(a.velocity);
			var von = v.dot(d) * rdis / v.length();
			if (von <= 0) {
				v.multiply(von);
				b.applyImpulse(v.clone().multiply(a.mass),
					d.clone().multiply(-b.r * rdis).add(b.position));
				a.applyImpulse(v.multiply(-b.mass),
					d.multiply(a.r * rdis).add(a.position));
			}
		}
	},

	/**
	 * Collide  Vertiable  vs  Normable & Static Body
	 * @param {Body} a - hasAttr getVertices
	 * @param {Body} b - hasAttr getNormalAt, and static
	 */
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
