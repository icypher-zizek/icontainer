/**
 * ProductService.js
 */
var Service=require('../Service');

/**
 * ProductService constructor
 * @param pDatasource	the data source
 */
var ProductService=function(pDatasource) {
	this.parent=Service;
	this.parent(pDatasource);
};
ProductService.prototype=new Service();

/**
 * Gets the view model
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
ProductService.prototype.getViewModel=function(pParams, pCallback) {
	throw 'ProductService.getViewModel(): Not yet implemented';
};

/**
 * Save model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
ProductService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	throw new Error('ProductService.saveViewModel() not yet implemented');
};

/**
 * Save text content
 * @param pParams		the request parameters
 * @param pTextContent	the text content to save
 * @param pCallback		the callback to invoke on completion
 */
ProductService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	throw new Error('ProductService.saveTextContent() not yet implemented');
};

/**
 * Save expertise
 * @param pParams		the request parameters
 * @param pExpertise	the product expertise to save
 * @param pCallback		the callback to invoke on completion
 */
ProductService.prototype.saveExpertise=function(pParams, pExpertise, pCallback) {
	throw new Error('ProductService.saveExpertise() not yet implemented');
};

/**
 * Save characteristis
 * @param pParams			the request parameters
 * @param pCharacteristics	the product characteristics to save
 * @param pCallback			the callback to invoke on completion
 */
ProductService.prototype.saveCharacteristics=function(pParams, pCharacteristics, pCallback) {
	throw new Error('ProductService.saveCharacteristics() not yet implemented');
};

module.exports=ProductService;