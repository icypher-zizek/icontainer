/**
 * ContactService.js
 */
var Service=require('../Service');

/**
 * ContactService constructor
 * @param pDatasource	the data source
 */
var ContactService=function(pDatasource) {
	this.parent=Service;
	this.parent(pDatasource);
};
ContactService.prototype=new Service();

/**
 * Gets the view model
 * @param pParams		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
ContactService.prototype.getViewModel=function(pParams, pCallback) {
	throw 'ContactService.getViewModel(): Not yet implemented';
};

/**
 * Save a view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
ContactService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	throw new Error('ContactService.saveViewModel() not yet implemented');
};

/**
 * Sends an email
 * @param pParams		the request parameters
 * @param pEmail		the email 
 * @param pCallback		the callback to invoke on completion
 */
ContactService.prototype.sendEmail=function(pParams, pEmail, pCallback) {
	throw 'ContactService.sendEmail(): Not yet implemented';
};

/**
 * Save text content
 * @param pParams		the request parameters
 * @param pTextContent	the request parameters
 * @param pCallback		the callback to invoke on completion
 */
ContactService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	throw new Error('ContactService.saveTextContent() not yet implemented');
};

module.exports=ContactService;