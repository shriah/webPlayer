var express = require('express')
var router = express.Router();
var fileService = require('../service/file.js')
var id3 = require('../service/id3.js')
function jsonParser(s) {
    return s.map(function (x) {
        return JSON.stringify(x)
    });
}

router.get('/',function(req,res){
	var directory = req.query.dir;
	res.writr
    fileService().collect().toArray(function (xs) {
    	res.send(xs[0]);
	});
	
});
router.get('/image',function(req,res){
	var file = req.query.file;
	console.log(file);
	id3({filePath:file},function(err,tags){
		if(tags.picture&&tags.picture.length>0 && tags.picture[0].data){
			console.log('sending image');
			res.send(tags.picture[0].data);
		}
		if(err){
			console.log(err);
		}
		res.status(404).end();
	});
});
module.exports = router;