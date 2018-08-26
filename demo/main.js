var world = new N2.World();

var b1 = new N2.Rect({
	mass: 1,
	position: new N2.Vec2(100, 160),
	velocity: new N2.Vec2(0, 0),
	angularVelocity: Math.PI/10,
	size: new N2.Vec2(70, 30),
});
world.add(b1);
var b2 = new N2.Rect({
	mass: 0,
	position: new N2.Vec2(200, 300),
	velocity: new N2.Vec2(0, 0),
	rotation: -Math.PI/2,
	angularVelocity: 0,
	size: new N2.Vec2(30, 400),
});
world.add(b2);

function createBall(p) {
	world.add(new N2.Circle({
		mass: 1,
		position: new N2.Vec2(p.x, p.y),
		velocity: new N2.Vec2(0, 0),
		angularVelocity: Math.PI/10,
		r: 20,
	}));
}

function getMousePos(e) {
	var rect = e.srcElement.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top,
	};
}

var render = new N2.Render('#ourCanvas');

var last_p;
render.canvas.addEventListener('click', function(e) {
	var p = getMousePos(e);
	p = new N2.Vec2(p.x, p.y);
	if (last_p) {
		b1.applyImpulse(p.sub(last_p), last_p);
		last_p = undefined;
	} else {
		last_p = p;
	}
}, false);

world.onTick(function() {
	render.clear();

	render.rect(b1.position.x, b1.position.y, b1.size.x, b1.size.y, b1.rotation);
	render.rect(b2.position.x, b2.position.y, b2.size.x, b2.size.y, b2.rotation);

	N2.Collide.react_Vertiable_NormableStatic(b1, b2);

	for (var i in world.bodies) {
		var c = world.bodies[i];
		render.circle(c.position.x, c.position.y, c.r, c.rotation);

		var minV = 10;

		if (c.position.y - c.r < 0) {
			c.velocity.y *= -0.95;
			c.angularVelocity *= 0.9;
			c.position.y = c.r;
		}
		if (c.position.y + c.r > render.canvas.height) {
			c.velocity.y *= -0.95;
			c.angularVelocity *= 0.9;
			c.position.y = render.canvas.height - c.r;
		}

		if (c.position.x + c.r > render.canvas.width) {
			c.velocity.x *= -0.95;
			c.angularVelocity *= 0.9;
			c.position.x = render.canvas.width - c.r;
		}
		if (c.position.x - c.r < 0) {
			c.velocity.x *= -0.95;
			c.angularVelocity *= 0.9;
			c.position.x = c.r;
		}

		if (Math.round(c.position.y + c.r) == render.canvas.height
			&& Math.abs(c.velocity.y) < minV) {
			c.velocity.y = 0;
			c.velocity.x *= 0.95;
		}
		if (Math.abs(c.velocity.x) < minV) {
			c.velocity.x = 0;
		}
	}
})

world.start();
