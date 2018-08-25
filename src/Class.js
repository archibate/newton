var Class = function() {};

Class.extend = function(prop) {
	var _super = this.prototype;
	var prototype = Object.create(this.prototype);
	for (var name in prop) {
		prototype[name] = name === 'ctor' ?
			(function(name, fn) {
				return function() {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			})(name, prop[name]) : prop[name];
	}

	function Class() {
		Class.prototype.ctor.apply(this, arguments);
	}

	Class.prototype = prototype;
	Class.prototype._super = Object.create(this.prototype);
	Class.prototype.constructor = Class;
	Class.extend = arguments.callee;

	return Class;
};
