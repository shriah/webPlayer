var glob = require("glob");
var id3 = require('./id3.js')
var _ = require('highland');
var walk    = require('walk');
var path = require('path');


module.exports = function(){
	function jsonParser(s) {
	    return s.map(function (x) {
	        return JSON.stringify(x)
	    });
	}

	var fileStream = _(function(push,next){
		

		var walker = walk.walk('/Users/harishg/personal',{ followLinks: true });

		var fileHandler = function fileHandler(root, fileStat, nextFile) {
		  
		    //console.log(fileStat);
		    var filePath = path.resolve(root, fileStat.name);
		    push(null,{filePath:filePath,fileName:fileStat.name});
		    nextFile();
		  
		}

		var errorsHandler = function (root, nodeStatsArray, nextFile) {
		  nodeStatsArray.forEach(function (n) {
		    console.error("[ERROR] " + n.name)
		    console.error(n.error.message || (n.error.code + ": " + n.error.path));
		  });
		  next();
		  nextFile();

		}

		var endHandler = function () {
			console.log('END FILE WALK')
		   push(null, _.nil);
		}
		walker.on("file", fileHandler);
		walker.on("errors", errorsHandler); // plural
		walker.on("end", endHandler);
	});


	var id3Stream = _.wrapCallback(id3);
	return fileStream.filter(function(file){
		
		if(file.filePath.indexOf('mp3')>0){
			//console.log(file);
			return true;
		}
		return false;
	}).flatMap(id3Stream).map(function(tags){
		if(tags.picture&&tags.picture.length>0&&tags.picture[0].data){
			tags.picture[0].data = null;
			tags.image = true;
		}else{
			tags.image = false;
		}
		return tags;
	}).errors(function (err, push) {
	   
	       
	        console.log(err);
	   
	});
}