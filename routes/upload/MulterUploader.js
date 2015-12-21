/**
 * MulterUploader.js
 */
var multer=require('multer');

var MulterUploader=function(targetDir) {
	this.targetDir=targetDir || './uploads/';
	
	/**
	 * @returns	the upload handler
	 */
	this.getUploadHandler=function() {
		return multer({ dest: this.targetDir});
	};
	
	/**
	 * @returns	the upload express router
	 */
	this.getUploadRouter=function() {
		return multer({ 
			dest: this.targetDir,
		    rename: function (fieldname, filename) {
		        return filename+'_'+Date.now();
		    },
		    onFileUploadStart: function (file) {
		        console.log(file.originalname + ' is starting ...');
		    },
		    onFileUploadComplete: function (file) {
		        console.log(file.fieldname + ' uploaded to  ' + file.path)
		    }
		});
	}
};

module.exports=MulterUploader;