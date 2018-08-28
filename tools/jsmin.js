var compressor = require('node-minify');

compressor.minify({
  compressor: 'gcc',
  input: process.stdin,
  output: process.stdout,
  callback: function(err, min) {}
});
