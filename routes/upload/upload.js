/**
 * Configure web server uploads
 * upload.js
 */
var upload=require('multer');
var upload_api=require('./upload_api');
var MulterUploader=require('./MulterUploader');

module.exports={
	configure: function(app) {
		if(!app) {
			console.log('ERROR: Missing web server => aborting configuration !');
			return;
		}
		console.log('Upload: configuring upload ...');
		var uploader=new MulterUploader('./uploads/');
		//app.use(uploader.getUploadRouter());
		var router=upload_api(uploader.getUploadHandler());
		router && app.use(router);
	}
};