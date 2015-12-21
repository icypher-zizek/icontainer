/**
 * BlogClientService.js
 */
var ClientService=require('../ClientService');
var BlogService=require('./BlogService');
var BlogFetcherConfig=require('./BlogFetcherConfig');

// create client fetcher
var Fetcher=require('fetchr');
var BlogFetcher;
if(Fetcher.registerFetcher) {
	console.log("+++ Server: creating BlogClientFetcher");
	Fetcher.registerFetcher(BlogFetcherConfig.configure());
	BlogFetcher=new Fetcher({req: {}});
} else {
	//console.log("+++ Client: creating BlogClientFetcher");
	BlogFetcher=new Fetcher({xhrPath: '/data'});
}


var BlogClientService=function() {
	this.parent=BlogService
	this.parent();
	this.client=new ClientService({
		fetcherName: BlogFetcherConfig.fetcherName, 
		fetcher: BlogFetcher
	});
};
BlogClientService.prototype=new BlogService();

/**
 * Gets the view model
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
BlogClientService.prototype.getViewModel=function(pParams, pCallback) {
	//console.log('BlogClientService.getViewModel()', pParams);
	this.client.callReadInFetcher('Blog', 'getViewModel', pParams, pCallback);
};

/**
 * Save a view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
BlogClientService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('BlogClientService.saveViewModel()', pViewModel);
	this.client.callCreateInFetcher('Blog', 'saveViewModel', pParams, pViewModel, pCallback);
};

/**
 * Gets the details of a blog entry
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
BlogClientService.prototype.getBlogEntryDetails=function(pParams, pCallback) {
	//console.log('BlogClientService.getBlogEntryDetails()', pParams);
	this.client.callReadInFetcher('Blog', 'getBlogEntryDetails', pParams, pCallback);
};

/**
 * Save a blog entry
 * @param pParams		the request parameters
 * @param pBlogEntry	the blog entry to save
 * @param pCallback		the callback to invoke on completion
 */
BlogClientService.prototype.saveBlogEntry=function(pLocale, pBlogEntry, pCallback) {
	//console.log('BlogClientService.saveBlogEntry()', pParams);
	this.client.callCreateInFetcher('Blog', 'saveBlogEntry', {}, pParams, pCallback);
};

module.exports=BlogClientService;