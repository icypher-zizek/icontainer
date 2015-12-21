/**
 * HomeService.js
 */
var Service=require('../Service');

/**
 * HomeService constructor
 * @param pDatasource	the data source
 */
var HomeService=function(pDatasource) {
	this.parent=Service;
	this.parent(pDatasource);
};
HomeService.prototype=new Service();

/**
 * Gets the view model
 * @param pParams		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
HomeService.prototype.getViewModel=function(pParams, pCallback) {
	throw 'HomeService.getViewModel(): Not yet implemented';
};

/**
 * Save model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
HomeService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	throw new Error('HomeService.saveViewModel() not yet implemented');
};

/**
 * Save text content
 * @param pParams		the request parameters
 * @param pSlider		the text content to save
 * @param pCallback		the callback to invoke on completion
 */
HomeService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	throw new Error('HomeService.saveTextContent() not yet implemented');
};

/**
 * Save slider data
 * @param pParams		the request parameters
 * @param pSlider		the slider to save
 * @param pCallback		the callback to invoke on completion
 */
HomeService.prototype.saveSliderData=function(pParams, pSlider, pCallback) {
	throw new Error('HomeDao.HomeService() not yet implemented');
};

module.exports=HomeService;