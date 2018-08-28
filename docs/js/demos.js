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
( 'Drop Box'
, 'How about to drop a box onto a surface?'
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
		position: new newton.Vec2(200, 300),
		velocity: new newton.Vec2(0, 0),
		rotation: -Math.PI/2 + Math.PI/48,
		angularVelocity: 0,
		size: new newton.Vec2(30, 400),
	});
	this.add(b2);

	var last_p;
	this.render.canvas.addEventListener('click', function(e) {
		var p = getMousePos(e);
		p = new newton.Vec2(p.x, p.y);
		if (last_p) {
			b1.applyImpulse(p.sub(last_p), last_p);
			last_p = undefined;
		} else {
			last_p = p;
		}
	}, false);

	this.onTick(function() {
		this.render.clear();

		this.render.rect(b1.position.x, b1.position.y, b1.size.x, b1.size.y, b1.rotation);
		this.render.rect(b2.position.x, b2.position.y, b2.size.x, b2.size.y, b2.rotation);

		newton.Collide.react_Vertiable_NormableStatic(b1, b2);
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

	this.onTick(function() {
		this.render.clear();

		for (var i in this.bodies) {
			var c = this.bodies[i];
			this.render.circle(c.position.x, c.position.y, c.r, c.rotation);

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

			/*if (Math.round(c.position.y + c.r) == this.render.canvas.height
				&& Math.abs(c.velocity.y) < minV) {
				c.velocity.y = 0;
				c.velocity.x *= decay_vel;
			}
			if (Math.abs(c.velocity.x) < minV) {
				c.velocity.x = 0;
			}*/

			for (var j in this.bodies) {
				if (j >= i)
					break;
				var d = this.bodies[j];
				newton.Collide.react_Circle_Circle(c, d);
			}
		}
	}.bind(this));
});},
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
