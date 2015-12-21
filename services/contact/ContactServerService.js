/**
 * ContactServerService.js
 */
var Async=require('async');
var ContactService=require('./ContactService');
var EmailService=require('../comm/EmailService');
var ContactDao=require('../../server/dao/DaoProvider').ContactDao;
var ContactModel=require('../../models/contact/ContactModel');
var ContactTextContent=require('../../models/contact/ContactTextContent');


/**
 * ContactServerService constructor
 * @param pDataSource	the datasource
 */
var ContactServerService=function(pDataSource) {
	this.parent=ContactService;
	this.parent(pDataSource);
	// daos
	this.contactDao=null;
	if(this.datasource && this.datasource.getDaoParams) {
		this.contactDao=new ContactDao(this.datasource.getDaoParams());
	} else {
		console.log('Daos could not be created: ',pDataSource);
	}
};
ContactServerService.prototype=new ContactService();


//=============================================================================================================//
//		SERVICE API METHODS
//=============================================================================================================//

/**
 * Gets the view model
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
ContactServerService.prototype.getViewModel=function(pParams, pCallback) {
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		var self=this;
		var model=new ContactModel();
		Async.waterfall(
			[
			 	function(wCallback) {
			 		// get text content
					self.contactDao.getTextContentByLocale(pParams.locale, wCallback);
				},
			 	function(textContent, wCallback) {
					model.setTextContent(textContent);
			 		wCallback(null);
			 	}
			],
			function(error) {
				pCallback && pCallback(error, model);
			}
		);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};


/**
 * Save a view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
ContactServerService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('ContactServerService.saveViewModel()', pParams, pTextContent);
	try {
		//if(! pViewModel instanceof ContactModel) throw new Error('Invalid ViewModel');
		if(pViewModel==undefined) throw new Error('Missing View Model');
		var self=this, response={};
		var queue=[
			function(sCallback) {
				self.saveTextContent(pParams, pViewModel.textContent, function(err, result) {
					response.textContent=err || true;
					sCallback(null);
				});
			}
		];
		Async.series(queue, function(err) {
			pCallback && pCallback(err, response);
		});
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};


/**
 * Sends an email
 * @param pParams	the request parameters
 * @param pEmail	the email parameters
 * @param pCallback	the callback to invoke on completion
 */
ContactServerService.prototype.sendEmail=function(pParams, pEmail, pCallback) {
	console.log('ContactServerService.sendEmail()', pParams, pEmail);
	try {
		if(pEmail==undefined) throw new Error('Missing Email');
		EmailService.sendEmail(EmailService.buildMailObject(pEmail), function(err, response) {
			console.log(response);
			pCallback && pCallback(err, response);
		})
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};


/**
 * Save text content
 * @param pParams		the request parameters
 * @param pTextContent	the text content
 * @param pCallback		the callback to invoke on completion
 */
ContactServerService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	//console.log('ContactServerService.saveTextContent()', pParams, pTextContent);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		if(pTextContent==undefined) throw new Error('Missing TextContent');
		this.contactDao.saveTextContent(pParams.locale, new ContactTextContent(pTextContent), pCallback);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

module.exports=ContactServerService;
