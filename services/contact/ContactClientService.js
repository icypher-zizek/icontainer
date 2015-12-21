/**
 * ContactClientService.js
 */
var ClientService=require('../ClientService');
var ContactService=require('./ContactService');
var ContactFetcherConfig=require('./ContactFetcherConfig');

// create client fetcher
var Fetcher=require('fetchr');
var ContactFetcher;
if(Fetcher.registerFetcher) {
	console.log("+++ Server: creating ContactClientFetcher");
	Fetcher.registerFetcher(ContactFetcherConfig.configure());
	ContactFetcher=new Fetcher({req: {}});
} else {
	//console.log("+++ Client: creating ContactClientFetcher");
	ContactFetcher=new Fetcher({xhrPath: '/data'});
}


var ContactClientService=function() {
	this.parent=ContactService
	this.parent();
	this.client=new ClientService({
		fetcherName: ContactFetcherConfig.fetcherName, 
		fetcher: ContactFetcher
	});
};
ContactClientService.prototype=new ContactService();

/**
 * Gets the view model
 * @param pParams		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
ContactClientService.prototype.getViewModel=function(pParams, pCallback) {
	console.log('ContactClientService.getViewModel()', pParams);
	this.client.callReadInFetcher('Contact', 'getViewModel', pParams, pCallback);
};

/**
 * Save a view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
ContactClientService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('ContactClientService.saveViewModel()', pViewModel);
	this.client.callCreateInFetcher('Contact', 'saveViewModel', pParams, pViewModel, pCallback);
};

/**
 * Sends an email
 * @param pParams		the request parameters
 * @param pEmail		the email to save
 * @param pCallback		the callback to invoke on completion
 */
ContactClientService.prototype.sendEmail=function(pParams, pEmail, pCallback) {
	console.log('ContactClientService.sendEmail()', pParams);
	this.client.callCreateInFetcher('Contact', 'sendEmail', pParams, pEmail, pCallback);
};

/**
 * Save text content
 * @param pParams		the request parameters
 * @param pTextContent	the text content to save
 * @param pCallback		the callback to invoke on completion
 */
ContactClientService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	console.log('ContactClientService.saveTextContent()', pParams);
	this.client.callCreateInFetcher('Contact', 'saveTextContent', pParams, pTextContent, pCallback);
};

module.exports=ContactClientService;
