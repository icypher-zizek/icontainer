/**
 * BlogService.js
 */
var Service=require('../Service');

/**
 * BlogService constructor
 * @param pDatasource	the data source
 */
var BlogService=function(pDatasource) {
	this.parent=Service;
	this.parent(pDatasource);
};
BlogService.prototype=new Service();

/**
 * Gets the view model
 * @param pParams		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
BlogService.prototype.getViewModel=function(pParams, pCallback) {
	throw 'BlogService.getViewModel(): Not yet implemented';
};

/**
 * Save a view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
BlogService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	throw new Error('BlogService.saveViewModel() not yet implemented');
};

/**
 * Gets the details of a blog entry
 * @param pParams		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
BlogService.prototype.getBlogEntryDetails=function(pParams, pCallback) {
	throw 'BlogService.getBlogEntryDetails(): Not yet implemented';
};

/**
 * Save a blog entry
 * @param pParams		the request parameters
 * @param pBlogEntry	the blog entry to save
 * @param pCallback		the callback to invoke on completion
 */
BlogService.prototype.saveBlogEntry=function(pParams, pBlogEntry, pCallback) {
	throw new Error('BlogDao.saveBlogEntry() not yet implemented');
};

module.exports=BlogService;