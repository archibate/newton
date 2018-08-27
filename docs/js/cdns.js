(function(){

var cdns = [
	'N2.js',
	'N2.min.js',
];

var vm = new Vue({
	el: '#cdns',
	data: {
		cdns: cdns,
	},
	methods: {
		toname: function(x) {
			return x;
		},
		tohref: function(x) {
			return 'js/' + x;
		},
		toscript: function(x) {
			return '<script src="https://archibate.github.io/js/' + x + '"></script>';
		},
	},
});

if (typeof Clipboard === 'undefined')
	Clipboard = ClipboardJS;

var clipboard = new Clipboard('.clipboard-btn');
clipboard.on('success', function(e) {
	mdui.alert('copied to clipboard');
});
clipboard.on('error', function(e) {
	mdui.alert('failed in copy to clipboard');
});

})();
