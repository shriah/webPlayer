var fs = require('fs');
var id3 = require('musicmetadata');

module.exports = function(file,cb){

		//console.log(file.fileName+'\n');
		var fileRead = fs.createReadStream(file.filePath);
		fileRead.on('error', function(err) {
			console.log('Invalid Filename');
		    cb(null,{fileInfo:file});
		 });
		id3(fileRead, function(err,tags){
			tags.fileInfo = file;
			if(err){
				cb(null,{fileInfo:file});
			}else{
				cb(null,tags);
			}
		});
	}