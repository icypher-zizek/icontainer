/**
 * FileUtils.js
 */
var fs=require('fs');

var FileUtils={};

FileUtils.loadJsonFile=function(pFile, pCallback) {
	fs.readFile(pFile, 'utf8', function (err, data) {
		var response=null;
	    if (!err) {
	    	response=JSON.parse(data);
	    }
	    pCallback && pCallback(err, response);
	});
};

module.exports=FileUtils;