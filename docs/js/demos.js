(function() {

function smoothstep(a, b, x) {
	if (x < a)
		return 0;
	if (x > b)
		return 1;
	var y = (x - a) / (b - a);
	return y * y * (3 - 2 * y);
}

function getMousePos(e) {
	if (e.layerX && e.layerY) {
		return {
			x: e.layerX,
			y: e.layerY,
		};
	} else {
		var rect = e.srcElement.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
	}
}

class Demo extends newton.World {
	constructor(name, brief, init) {
		super();
		this.name = name;
		this.brief = brief;
		this.init = init;
	}
}

var demos_f = [
////begin
function(){return new Demo
( 'Double Pendulum'
, 'Chaos Museum. Click mouse to show the trace.'
, function() {
	var CY = 80;
	var R1 = 120;
	var R12 = 80;
	var c1 = new newton.Circle({
		mass: 1,
		position: new newton.Vec2(200, CY + R1),
		velocity: new newton.Vec2(0, 0),
		rotation: 0,
		angularVelocity: 0,
		r: 20,
	});
	this.add(c1);
	var c2 = new newton.Circle({
		mass: 0.5,
		position: new newton.Vec2(200, CY + R1 + R12),
		velocity: new newton.Vec2(-500, 0),
		rotation: 0,
		angularVelocity: 0,
		r: 14,
	});
	this.add(c2);

	var trace = false;
	var last_p = c2.position;
	this.render.canvas.addEventListener('click', function(e) {
		if (trace = !trace)
			this.render.clear();
		last_p = c2.position;
		/*var p = getMousePos(e);
		p = new newton.Vec2(p.x, p.y);
		c2.applyImpulse(p.sub(c2.position), c2.position);*/
	}.bind(this), false);

	var center = new newton.Vec2(200, CY);

	c1.fixTicker = 0;
	c2.fixTicker = 3;
	this.onStep(function() {
		c1.applyCenteredCircularConstraint(center);
		var c1velocity = c1.velocity.clone();
		var c2velocity = c2.velocity.clone();
		c2.velocity.sub(c1velocity);
		c2.applyCenteredCircularConstraint(c1.position);
		if (c1.fixTicker++ % 5 == 0)
			c1.fixCenteredCircularConstraint(center, R1);
		if (c2.fixTicker++ % 5 == 0)
			c2.fixCenteredCircularConstraint(c1.position, R12);
		c2.velocity.add(c1velocity);
		c1.velocity.sub(c2velocity);
		c1.applyCenteredCircularConstraint(c2.position);
		c1.velocity.add(c2velocity);
	}.bind(this));

	this.onTick(function() {
		if (trace) {
			this.render.line(last_p.x, last_p.y, c2.position.x, c2.position.y);
			last_p = c2.position.clone();
		} else {
			this.render.clear();

			this.render.line(center.x, center.y, c1.position.x, c1.position.y);
			this.render.circle(c1.position.x, c1.position.y, c1.r, c1.rotation);
			this.render.line(c1.position.x, c1.position.y, c2.position.x, c2.position.y);
			this.render.circle(c2.position.x, c2.position.y, c2.r, c2.rotation);
		}
	}.bind(this));
});},
function(){return new Demo
( 'Drop Box'
, 'Press mouse to apply impulse in that direction.'
, function() {
	var b1 = new newton.Rect({
		mass: 1,
		position: new newton.Vec2(100, 160),
		velocity: new newton.Vec2(0, 0),
		angularVelocity: Math.PI/10,
		size: new newton.Vec2(70, 30),
	});
	this.add(b1);
	var b2 = new newton.Rect({
		mass: 0,
		position: new newton.Vec2(200, 360),
		velocity: new newton.Vec2(0, 0),
		rotation: -Math.PI/2 - Math.PI/48,
		angularVelocity: 0,
		size: new newton.Vec2(30, 400),
	});
	this.add(b2);
	var b3 = new newton.Rect({
		mass: 0,
		position: new newton.Vec2(360, 200),
		velocity: new newton.Vec2(0, 0),
		rotation: -Math.PI,
		angularVelocity: 0,
		size: new newton.Vec2(30, 400),
	});
	this.add(b3);
	var b4 = new newton.Rect({
		mass: 0,
		position: new newton.Vec2(40, 200),
		velocity: new newton.Vec2(0, 0),
		rotation: 0,
		angularVelocity: 0,
		size: new newton.Vec2(30, 400),
	});
	this.add(b4);

	/*var last_p;
	this.render.canvas.addEventListener('click', function(e) {
		var p = getMousePos(e);
		p = new newton.Vec2(p.x, p.y);
		if (last_p) {
			b1.applyImpulse(p.sub(last_p), last_p);
			last_p = undefined;
		} else {
			last_p = p;
		}
	}, false);*/
	this.render.canvas.addEventListener('click', function(e) {
		var p = getMousePos(e);
		p = new newton.Vec2(p.x, p.y);
		b1.applyImpulse(p.sub(b1.position), b1.position);
	}, false);

	function lineEqu(p, o, n)
	{
		return p.clone().sub(o).dot(n);
	}

	var lright = 300;
	var origPoint = b1.getVertices()[1];
	var n = newton.polarCCW(Math.PI/10).rotatedCW();
	this.onStep(function() {
		var vs = b1.getVertices();
		for (var i in vs) {
			var point = vs[i];
			if (point.x <= lright && Math.abs(lineEqu(point, origPoint, n)) <= 2.5)
				b1.applyLinearConstraint(point, n, true, 0.2);
		}
		newton.Collide.react_Vertiable_NormableStatic(b1, b2, 0.9);
		newton.Collide.react_Vertiable_NormableStatic(b1, b3, 0.9);
		newton.Collide.react_Vertiable_NormableStatic(b1, b4, 0.9);
	}.bind(this));

	this.onTick(function() {
		this.render.clear();

		var from = n.rotatedCW().multiply(origPoint.x).add(origPoint);
		var to = n.rotatedCCW().multiply(lright - origPoint.x).add(origPoint);
		this.render.line(from.x, from.y, to.x, to.y);

		for (var i in this.bodies) {
			var b = this.bodies[i];
			this.render.rect(b.position.x, b.position.y,
					 b.size.x, b.size.y, b.rotation);
		}

	}.bind(this));
});},
function(){return new Demo
( 'Birth of a Planet'
, 'Drop a lot of dust by mouse and watch what will happen!'
, function() {

	this.getGravity = function(self) {
		var G = 200000;
		var acc = new newton.Vec2(0, 0);
		for (var i in this.bodies) {
			var body = this.bodies[i];
			var dis = body.position.clone().sub(self.position);
			var d = dis.length();
			var rate = smoothstep(body.r * 5, body.r * 0.5, d);
			if (rate > 0) {
				var d3 = d * d * d;
				acc.add(dis.multiply(rate * G / d3));
			}
		}
		return acc;
	};

	var createBall = function(p) {
		var r = smoothstep(0, 1, Math.random()) * 1.5 + 4.5;
		this.add(new newton.Circle({
			mass: r*r/25,
			position: new newton.Vec2(p.x, p.y),
			velocity: newton.polarCCW(Math.random() * Math.PI * 2)
				    .multiply(Math.random() * 260),
			rotation: Math.PI * 2 * Math.random(),
			angularVelocity: Math.PI * Math.random(),
			r: r,
		}));
	}.bind(this);

	for (var i = 0; i < 3; i++) {
		createBall({x: this.render.canvas.width  * Math.random(),
			    y: this.render.canvas.height * Math.random()});
	}

	this.render.canvas.addEventListener('click', function(e) {
		createBall(getMousePos(e));
	}, false);

	var decay_vel = 0.8;
	var decay_angvel = 0.8;

	this.timeStep = 1/60;
	this.splitSteps = 5;

	this.onStep(function() {
		for (var i in this.bodies) {
			var c = this.bodies[i];

			var minV = 10;

			if (c.position.y - c.r < 0) {
				c.velocity.y *= -decay_vel;
				c.angularVelocity *= decay_angvel;
				c.position.y = c.r;
			}
			if (c.position.y + c.r > this.render.canvas.height) {
				c.velocity.y *= -decay_vel;
				c.angularVelocity *= decay_angvel;
				c.position.y = this.render.canvas.height - c.r;
			}

			if (c.position.x + c.r > this.render.canvas.width) {
				c.velocity.x *= -decay_vel;
				c.angularVelocity *= decay_angvel;
				c.position.x = this.render.canvas.width - c.r;
			}
			if (c.position.x - c.r < 0) {
				c.velocity.x *= -decay_vel;
				c.angularVelocity *= decay_angvel;
				c.position.x = c.r;
			}

			for (var j in this.bodies) {
				if (j >= i)
					break;
				var d = this.bodies[j];
				newton.Collide.react_Circle_Circle(c, d);
			}
		}
	}.bind(this));

	this.onTick(function() {
		this.render.clear();

		for (var i in this.bodies) {
			var c = this.bodies[i];
			this.render.circle(c.position.x, c.position.y, c.r, c.rotation);
		}
	}.bind(this));
});},/**/
////end
];

var demos = demos_f.map(function(f) {
	return f();
});

function pause(i) {
	if (!demos[i].timer) {
		demos[i].start();
		document.getElementById('pause-' + i).innerHTML = 'pause';
	} else {
		demos[i].pause();
		document.getElementById('pause-' + i).innerHTML = 'play_arrow';
	}
}

function reset(i) {
	var was_running = demos[i].timer;
	if (was_running)
		demos[i].pause();
	demos[i] = demos_f[i]();
	demos[i].render = new newton.Render('#canvas-' + i);
	demos[i].init();
	demos[i].tick(0);
	demos[i].start();
	demos[i].pause();
	if (was_running)
		demos[i].start();
}

var vm = new Vue({
	el: '#demos',
	data: {
		demos: demos,
	},
	methods: {
		pause: pause,
		reset: reset,
	},
});

for (var i in demos) {
	reset(i);
}

})();
