/**
 * ProductFetcherConfig.js
 */

var ProductFetcherConfig={
	fetcherName: "product_fetcher",
	configure: function(pServiceArgs) {
		var ProductService=require('./ProductServerService');
		var FetcherFactory=require('../fetcher/FetcherFactory.js');
		var ServiceMap={Product: new ProductService(pServiceArgs)};
		var ProductFetcher=FetcherFactory.create(ProductFetcherConfig.fetcherName, ServiceMap);
		return ProductFetcher; 
	}
};

module.exports=ProductFetcherConfig;