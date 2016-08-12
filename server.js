var http = require('http');
var app = require('./app.js');

require('./config/development.js')();


http.createServer(app).listen(process.env.PORT, process.env.HOST);

console.log('================================');
console.log('===== Server start on ' +process.env.PORT+' =====');
console.log('================================');