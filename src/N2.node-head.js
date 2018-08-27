(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ?
		module.exports = factory() :
		typeof define === 'function' && define.amd ?
		define(factory) : (global.N2 = factory());
})(this, (function () {
	var exports = {};
	/**
	 * N2.js, a 2d rigid-body physics engine written in javascript ES6.
	 * @module
	 */
