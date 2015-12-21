/**
 * upload_api.js
 */
var express=require('express');
var upload_api=express.Router();

module.exports=function(uploader, uploadRoute) {
	if(!uploader) {
		console.log('Missing uploader !');
		return null;
	}
	var route=uploadRoute || '/upload/image';
	upload_api.post(route, function(req,res) {
		uploader(req,res,function(err) {
	        if(err) {
	            return res.end("Error uploading file.");
	        }
	        res.end("File is uploaded");
	    });
	});
	return upload_api;
};