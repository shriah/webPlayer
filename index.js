var express = require('express');
var app = express();
var homeRouter = require('./router/home.js');
var streamRouter = require('./router/stream.js');
var fileRouter = require('./router/files.js');

app.use(express.static('public'));
app.use('/',homeRouter);
app.use('/files',fileRouter);
app.use('/play',streamRouter);
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});