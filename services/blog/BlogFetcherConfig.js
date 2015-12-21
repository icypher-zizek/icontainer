/**
 * BlogFetcherConfig.js
 */

var BlogFetcherConfig={
	fetcherName: "blog_fetcher",
	configure: function(pServiceArgs) {
		var BlogService=require('./BlogServerService');
		var FetcherFactory=require('../fetcher/FetcherFactory.js');
		var ServiceMap={Blog: new BlogService(pServiceArgs)};
		var BlogFetcher=FetcherFactory.create(BlogFetcherConfig.fetcherName, ServiceMap);
		return BlogFetcher;		
	}
};

module.exports=BlogFetcherConfig;