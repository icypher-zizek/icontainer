/**
 * ContactFetcherConfig.js
 */

var ContactFetcherConfig={
	fetcherName: "contact_fetcher",
	configure: function(pServiceArgs) {
		var ContactService=require('./ContactServerService');
		var FetcherFactory=require('../fetcher/FetcherFactory.js');
		var ServiceMap={Contact: new ContactService(pServiceArgs)};
		var ContactFetcher=FetcherFactory.create(ContactFetcherConfig.fetcherName, ServiceMap);
		return ContactFetcher; 
	}
};

module.exports=ContactFetcherConfig;