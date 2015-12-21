/**
 * ClientService.js
 */
var ServiceUtils=require('./ServiceUtils');
var ModelTransposer=require('../utils/common/ModelTransposer');

/**
 * ClientService
 * @param pParams
 */
function ClientService(pParams) {
	this.fetcherName=null;
	this.fetcher=null;
	if(pParams) {
		if(pParams.fetcherName) this.fetcherName=pParams.fetcherName;
		if(pParams.fetcher) this.fetcher=pParams.fetcher;
	}

	/**
	 * Adds a service name and pHandler to the request parameters
	 * @param pParams		the request parameters
	 * @param pServiceName	the service name to add
	 * @param pHandler		the handler to add
	 * @returns				the new request parameters
	 */
	this.addRequestProps=function(pParams, pServiceName, pHandler) {
		console.log('ClientService.addRequestProps()', pParams, pServiceName, pHandler);
		var params=(pParams ? pParams : {});
		params.serviceName=pServiceName;
		params.handler=pHandler;
		return params;
	};

	/**
	 * Makes a GET-Request via the fetcher
	 * @param pServiceName	the service name
	 * @param pHandler		the handler
	 * @param pParams		the request parameters
	 * @param pCallback		the callback to invoke on Completion
	 * @param timeout		the HTTP-Request timeout
	 */
	this.callReadInFetcher=function(pServiceName, pHandler, pParams, pCallback, timeout) {
		//console.log('ClientService.callReadInFetcher', pServiceName, pHandler, pParams, pCallback);
		var params=this.addRequestProps(pParams, pServiceName, pHandler);
		var callbackTimeout=(timeout || ServiceUtils.timeout);
		this.fetcher.read(
			this.fetcherName,
			params /*ModelTransposer.liquefy(params)*/,
			{format: 'json', timeout: callbackTimeout},
			function(err, data) {
				pCallback && pCallback(err, /*data?ModelTransposer.solidify(data):*/data);
			}
		);
	};


	/**
	 * Makes a POST-Request via the fetcher
	 * @param pServiceName	the service name
	 * @param pHandler		the handler
	 * @param pParams		the request parameters
	 * @param dataObject	the request body
	 * @param pCallback		the callback to invoke on Completion
	 * @param timeout		the HTTP-Request timeout
	 */
	this.callCreateInFetcher=function(pServiceName, pHandler, pParams, dataObject, pCallback, timeout) {
		var params=this.addRequestProps(pParams, pServiceName, pHandler);
		var callbackTimeout=(timeout || ServiceUtils.timeout);
		this.fetcher.create(
			this.fetcherName,
			params /*ModelTransposer.liquefy(params)*/,
			dataObject /*ModelTransposer.liquefy(dataObject)*/,
			{format: 'json', timeout: callbackTimeout},
			function(err, data) {
				pCallback && pCallback(err, /*data?ModelTransposer.solidify(data):*/data);
			}
		);	
	};


	/**
	 * Makes a DELETE-Request via the fetcher
	 * @param pServiceName	the service name
	 * @param pHandler		the handler
	 * @param pParams		the request parameters
	 * @param pCallback		the callback to invoke on Completion
	 * @param timeout		the HTTP-Request timeout
	 */
	this.callDeleteInFetcher=function(pServiceName, pHandler, pParams, pCallback, timeout) {
		var params=this.addRequestProps(pParams, pServiceName, pHandler);
		var callbackTimeout=(timeout || ServiceUtils.timeout);
		this.fetcher.delete(
			this.fetcherName,
			params /*ModelTransposer.liquefy(params)*/,
			{format: 'json', timeout: callbackTimeout},
			function(err, data) {
				pCallback && pCallback(err, /*data?ModelTransposer.solidify(data):*/data);
			}
	    );
	};


	/**
	 * Makes an UPDATE-Request via the fetcher
	 * @param pServiceName	the service name
	 * @param pHandler		the handler
	 * @param pParams		the request parameters
	 * @param dataObject	the request body
	 * @param pCallback		the callback to invoke on Completion
	 * @param timeout		the HTTP-Request timeout
	 */
	this.callUpdateInFetcher=function(pServiceName, pHandler, pParams, dataObject, pCallback, timeout){
		var params=this.addRequestProps(pParams, pServiceName, pHandler);
		var callbackTimeout=(timeout || ServiceUtils.timeout);
		this.fetcher.update(
			this.fetcherName,
			params /*ModelTransposer.liquefy(params)*/,
			dataObject /*ModelTransposer.liquefy(dataObject)*/,
			{format: 'json', timeout: callbackTimeout},
			function(err, data) {
				pCallback && pCallback(err, /*data?ModelTransposer.solidify(data):*/data);
			}
		);
	};
};

module.exports=ClientService;