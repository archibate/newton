var world = new N2.World();

var box = new N2.Rect({
	mass: 1,
	position: new N2.Vec2(100, 100),
	velocity: new N2.Vec2(0, 0),
	angularVelocity: Math.PI/10,
	size: new N2.Vec2(70, 30),
});
world.add(box);

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

render.canvas.addEventListener('click', function(e) {
	box.applyImpulse(new N2.Vec2(200,-250),
		new N2.Vec2(box.position.x-10,box.position.y-10));
	createBall(getMousePos(e));
}, false);

world.onTick(function() {
	render.clear();

	render.rect(box.position.x, box.position.y, box.size.x, box.size.y, box.rotation);

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
