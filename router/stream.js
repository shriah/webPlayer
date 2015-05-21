var fs   = require('fs');
var express = require('express')
var router = express.Router();
var send = require('send')

router.get('/',function(req,res){
	var path = req.query.file;
	send(req, path)
        //.root(Config.media)
        .on('error', function(err) {
            res.statusCode = err.status || 500;
            res.end(err.message);
        })
        .on('directory', function() {
            res.statusCode = 403;
            res.end("Forbidden");
        })
        .pipe(res);
});

module.exports = router;