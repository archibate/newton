/**
 * Collision functions
 */
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
	 * @param {number} k - the bounceness between two bodies
	 */
	react_Vertiable_NormableStatic: function(a, b, k)
	{
		var vertices = a.getVertices();
		for (var i in vertices) {
			var point = vertices[i];
			var n = b.getNormalAt(point);
			if (n === undefined)
				continue;
			a.applyLinearConstraint(point, n, true, k);
		}
	},
};
