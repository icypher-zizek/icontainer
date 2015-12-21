/**
 * HomeFetcherConfig.js
 */

var HomeFetcherConfig={
	fetcherName: "home_fetcher",
	configure: function(pServiceArgs) {
		var HomeService=require('./HomeServerService');
		var FetcherFactory=require('../fetcher/FetcherFactory.js');
		var ServiceMap={Home: new HomeService(pServiceArgs)};
		var HomeFetcher=FetcherFactory.create(HomeFetcherConfig.fetcherName, ServiceMap);
		return HomeFetcher; 
	}
};

module.exports=HomeFetcherConfig;