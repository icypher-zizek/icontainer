/**
 * ProductClientService.js
 */
var ClientService=require('../ClientService');
var ProductService=require('./ProductService');
var ProductFetcherConfig=require('./ProductFetcherConfig');

// create client fetcher
var Fetcher=require('fetchr');
var ProductFetcher;
if(Fetcher.registerFetcher) {
	console.log("+++ Server: creating ProductClientFetcher");
	Fetcher.registerFetcher(ProductFetcherConfig.configure());
	ProductFetcher=new Fetcher({req: {}});
} else {
	//console.log("+++ Client: creating ProductClientFetcher");
	ProductFetcher=new Fetcher({xhrPath: '/data'});
}


var ProductClientService=function() {
	this.parent=ProductService
	this.parent();
	this.client=new ClientService({
		fetcherName: ProductFetcherConfig.fetcherName, 
		fetcher: ProductFetcher
	});
};
ProductClientService.prototype=new ProductService();

/**
 * Gets the view model
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
ProductClientService.prototype.getViewModel=function(pParams, pCallback) {
	//console.log('ProductClientService.getViewModel()', pParams);
	this.client.callReadInFetcher('Product', 'getViewModel', pParams, pCallback);
};

/**
 * Save the view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
ProductClientService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('ProductClientService.saveViewModel()', pParams);
	this.client.callCreateInFetcher('Product', 'saveViewModel', pParams, pViewModel, pCallback);
};

/**
 * Save text content
 * @param pParams		the request parameters
 * @param pTextContent	the text content to save
 * @param pCallback		the callback to invoke on completion
 */
ProductClientService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	//console.log('ProductClientService.saveTextContent()', pParams);
	this.client.callCreateInFetcher('Product', 'saveTextContent', pParams, pTextContent, pCallback);
};

/**
 * Save expertise
 * @param pParams		the request parameters
 * @param pExpertise	the product expertise
 * @param pCallback		the callback to invoke on completion
 */
ProductClientService.prototype.saveExpertise=function(pParams, pExpertise, pCallback) {
	//console.log('ProductClientService.saveExpertise()', pParams);
	this.client.callCreateInFetcher('Product', 'saveExpertise', pParams, pExpertise, pCallback);
};

/**
 * Save characteristis
 * @param pParams			the request parameters
 * @param pCharacteristics	the product characteristics
 * @param pCallback			the callback to invoke on completion
 */
ProductClientService.prototype.saveCharacteristics=function(pParams, pCharacteristics, pCallback) {
	//console.log('ProductClientService.saveCharacteristics()', pParams);
	this.client.callCreateInFetcher('Product', 'saveCharacteristics', pParams, pCharacteristics, pCallback);
};

module.exports=ProductClientService;
