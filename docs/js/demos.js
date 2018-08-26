(function() {

function getMousePos(e) {
	var rect = e.srcElement.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top,
	};
}

var Demo = N2.World.extend({
	ctor: function(name, brief, init) {
		this._super();
		this.name = name;
		this.brief = brief;
		this.init = init;
	},
});

var demos = [
////begin
new Demo
( 'Drop Box'
, 'How about to drop a box onto a surface?'
, function() {
	var b1 = new N2.Rect({
		mass: 1,
		position: new N2.Vec2(100, 160),
		velocity: new N2.Vec2(0, 0),
		angularVelocity: Math.PI/10,
		size: new N2.Vec2(70, 30),
	});
	this.add(b1);
	var b2 = new N2.Rect({
		mass: 0,
		position: new N2.Vec2(200, 300),
		velocity: new N2.Vec2(0, 0),
		rotation: -Math.PI/2 + Math.PI/44,
		angularVelocity: 0,
		size: new N2.Vec2(30, 400),
	});
	this.add(b2);

	function getMousePos(e) {
		var rect = e.srcElement.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
	}

	var last_p;
	this.render.canvas.addEventListener('click', function(e) {
		var p = getMousePos(e);
		p = new N2.Vec2(p.x, p.y);
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

		N2.Collide.react_Vertiable_NormableStatic(b1, b2);
	}.bind(this));
}),
new Demo
( 'Drop Balls'
, 'How cool it will be to drop some balls on screen with mouse!'
, function() {
	var createBall = function(p) {
		this.add(new N2.Circle({
			mass: 1,
			position: new N2.Vec2(p.x, p.y),
			velocity: N2.polarCCW(Math.random() * Math.PI * 2)
				    .multiply(Math.random() * 260),
			angularVelocity: Math.PI/10,
			r: 20,
		}));
	}.bind(this);

	for (var i = 0; i < 3; i++) {
		createBall({x: this.render.canvas.width  * Math.random(),
			    y: this.render.canvas.height * Math.random()});
	}

	this.render.canvas.addEventListener('click', function(e) {
		createBall(getMousePos(e));
	}, false);

	this.onTick(function() {
		this.render.clear();

		for (var i in this.bodies) {
			var c = this.bodies[i];
			this.render.circle(c.position.x, c.position.y, c.r, c.rotation);

			var minV = 10;

			if (c.position.y - c.r < 0) {
				c.velocity.y *= -0.95;
				c.angularVelocity *= 0.9;
				c.position.y = c.r;
			}
			if (c.position.y + c.r > this.render.canvas.height) {
				c.velocity.y *= -0.95;
				c.angularVelocity *= 0.9;
				c.position.y = this.render.canvas.height - c.r;
			}

			if (c.position.x + c.r > this.render.canvas.width) {
				c.velocity.x *= -0.95;
				c.angularVelocity *= 0.9;
				c.position.x = this.render.canvas.width - c.r;
			}
			if (c.position.x - c.r < 0) {
				c.velocity.x *= -0.95;
				c.angularVelocity *= 0.9;
				c.position.x = c.r;
			}

			if (Math.round(c.position.y + c.r) == this.render.canvas.height
				&& Math.abs(c.velocity.y) < minV) {
				c.velocity.y = 0;
				c.velocity.x *= 0.95;
			}
			if (Math.abs(c.velocity.x) < minV) {
				c.velocity.x = 0;
			}
		}
	}.bind(this));
}),
////end
];

function pause(i) {
	if (!demos[i].timer) {
		demos[i].start();
		document.getElementById('pause-' + i).innerHTML = 'pause';
	} else {
		demos[i].pause();
		document.getElementById('pause-' + i).innerHTML = 'play_arrow';
	}
}

var vm = new Vue({
	el: '#container',
	data: {
		demos: demos,
	},
	methods: {
		pause: pause,
	},
});

for (var i in demos) {
	demos[i].render = new N2.Render('#canvas-' + i);
	demos[i].init();
	//pause(i);
}

})();
