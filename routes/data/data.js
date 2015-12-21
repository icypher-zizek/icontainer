/**
 * data.js
 */
var Fetcher=require('fetchr');

module.exports={
	/**
	 * Configures the web server data api 
	 * @param app 			the web server config
	 * @param path			the fetcher api-route
	 * @param datasource	the datasource 
	 */
	configure: function(app, path, datasource) {
		if(!app) {
			console.log('ERROR: Missing web server => aborting configuration !');
			return;
		}
		var route=(path ? path : '/data');

		// view
		var ViewFetcherConfig=require('../../services/view/ViewFetcherConfig');
		Fetcher.registerFetcher(ViewFetcherConfig.configure(datasource));

		// home
		var HomeFetcherConfig=require('../../services/home/HomeFetcherConfig');
		Fetcher.registerFetcher(HomeFetcherConfig.configure(datasource));

		// product
		var ProductFetcherConfig=require('../../services/product/ProductFetcherConfig');
		Fetcher.registerFetcher(ProductFetcherConfig.configure(datasource));

		// contact
		var ContactFetcherConfig=require('../../services/contact/ContactFetcherConfig');
		Fetcher.registerFetcher(ContactFetcherConfig.configure(datasource));
		
		// blog
		var BlogFetcherConfig=require('../../services/blog/BlogFetcherConfig');
		Fetcher.registerFetcher(BlogFetcherConfig.configure(datasource));

		// static
		var StaticFetcherConfig=require('../../services/static/StaticFetcherConfig');
		Fetcher.registerFetcher(StaticFetcherConfig.configure(datasource));

		app.use(route, Fetcher.middleware());
	}
};
