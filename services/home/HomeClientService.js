/**
 * HomeClientService.js
 */
var ClientService=require('../ClientService');
var HomeService=require('./HomeService');
var HomeFetcherConfig=require('./HomeFetcherConfig');

// create client fetcher
var Fetcher=require('fetchr');
var HomeFetcher;
if(Fetcher.registerFetcher) {
	console.log("+++ Server: creating HomeClientFetcher");
	Fetcher.registerFetcher(HomeFetcherConfig.configure());
	HomeFetcher=new Fetcher({req: {}});
} else {
	//console.log("+++ Client: creating HomeClientFetcher");
	HomeFetcher=new Fetcher({xhrPath: '/data'});
}


var HomeClientService=function() {
	this.parent=HomeService
	this.parent();
	this.client=new ClientService({
		fetcherName: HomeFetcherConfig.fetcherName, 
		fetcher: HomeFetcher
	});
};
HomeClientService.prototype=new HomeService();

/**
 * Gets the view model
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
HomeClientService.prototype.getViewModel=function(pParams, pCallback) {
	//console.log('HomeClientService.getViewModel()', pParams);
	this.client.callReadInFetcher('Home', 'getViewModel', pParams, pCallback);
};

/**
 * Save model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
HomeClientService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('HomeClientService.saveViewModel()', pViewModel);
	this.client.callCreateInFetcher('Home', 'saveViewModel', pParams, pViewModel, pCallback);
};

/**
 * Save text content
 * @param pParams		the request parameters
 * @param pTextContent	the text content to save
 * @param pCallback		the callback to invoke on completion
 */
HomeClientService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	//console.log('HomeClientService.saveTextContent()', pParams, pTextContent);
	this.client.callCreateInFetcher('Home', 'saveTextContent', pParams, pTextContent, pCallback);
};

/**
 * Save slider
 * @param pParams		the request parameters
 * @param pSlider		the slider to save
 * @param pCallback		the callback to invoke on completion
 */
HomeClientService.prototype.saveSliderData=function(pParams, pSlider, pCallback) {
	//console.log('HomeClientService.saveSliderData()', pParams, pSlider);
	this.client.callCreateInFetcher('Home', 'saveSliderData', pParams, pSlider, pCallback);
};

module.exports=HomeClientService;
