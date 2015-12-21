/**
 * CompositeHomeStore.js
 */
var Reflux=require('reflux');
var Async=require('async');
var HomeActions=require('../actions/HomeActions.js');
var Constants=require('../../../Constants');
var ViewService=require('../../../../services/ServiceProvider').ViewService;
var HomeStore=require('./HomeStore');
var ProductStore=require('../../product/stores/ProductStore');
var ContactStore=require('../../contact/stores/ContactStore');

var CompositeHomeStore=Reflux.createStore({
	init : function () {
		//console.log('initializing CompositeHomeStore ...');
		this.listenTo(HomeActions.getCompositeHomePageComponent, this.onGetCompositeHomePageComponent);
		this.resetStore();
	},
	resetStore: function() {
		this.viewConfig=null;
		this.viewModel=null;
	},
	onGetCompositeHomePageComponent: function(locale) {
		console.log('CompositeHomeStore.getCompositeHomePageComponent()', locale);
		var self=this;
		Async.series(
			[
			 	function(sCallback) {
			 		(self.viewConfig!=null) && sCallback(null);
			 		self.fetchPageComponent(locale, sCallback);
			 	},
			 	function(sCallback) { HomeStore.fetchPageModel(locale, sCallback);},
			 	function(sCallback) { ProductStore.fetchPageModel(locale, sCallback);},
			 	function(sCallback) { ContactStore.fetchPageModel(locale, sCallback);}
			],
			function(err) {
				if(err) {console.log(err);}
				else self.trigger(self.viewConfig);
			}
		);
	},
	fetchPageComponent: function(locale, pCallback) {
		var self=this;
//		this.viewConfig={
//			"component": "HorizontalLayersLayout",
//			"props": {
//				"className": "",
//				"component": [
//					"HomeSection",
//					"ProductSection",
//					"ContactSection"
//				],
//				"props": [
//					{ "className": "page-section" }, 
//					{ "className": "page-section" }, 
//					{ "className": "page-section" }
//				]
//			}
//		};
//		pCallback && pCallback(null);
 		// fetch view config
 		var props={view: "CompositeHomePage"};
 		ViewService.getConfig(props, function(err, config) {
 			if(!err) self.viewConfig=config;
 			pCallback && pCallback(err);
 		});
	}
});

module.exports=CompositeHomeStore;