/**
 * HomeStore.js
 */
var Reflux=require('reflux');
var HomeActions=require('../actions/HomeActions');
var CompositeHomeStore=require('./CompositeHomeStore');
var Constants=require('../../../Constants');
var ViewService=require('../../../../services/ServiceProvider').ViewService;
var HomeService=require('../../../../services/ServiceProvider').HomeService; 

var HomeStore=Reflux.createStore({
	mixins: [],
	init : function () {
		//console.log('initializing HomeStore ...');
		this.listenTo(HomeActions.getHomePageComponent, this.onGetHomePageComponent);
		this.listenTo(HomeActions.getHomePageModel, this.onGetHomePageModel);
		this.resetStore();
	},
	resetStore: function() {
		this.viewConfig=null;
		this.viewModel=null;
	},
	getInitialState: function() {
		console.log('HomeStore.getInitialState()');
		return this.state;
	},
	getHomePageComponent: function(locale) {
		console.log('HomeStore.getHomePageComponent()', locale);
		var self=this;
		Async.series(
			[
			 	function(sCallback) {
			 		if(self.viewConfig!=null) {
			 			sCallback(null);
			 		} else {
			 			self.fetchPageComponent(sCallback);
			 		}
			 	},
			 	function(sCallback) {
			 		self.fetchPageModel(locale, sCallback);
			 	}
			],
			function(err) {
				if(err) {console.log(err);}
		 		var config=JSON.parse(JSON.stringify(self.viewConfig));
		 		if(!err) {
					self.trigger(config);
		 		}
			}
		);
	},
	onGetViewModel: function(key) {
		var model={};
		if(key && this.viewModel[key]) {
			model[key]=JSON.parse(JSON.stringify(this.viewModel[key]))
		} else {
			model=JSON.parse(JSON.stringify(this.viewModel));
		}
		this.trigger(model);
	},
	onGetHomePageModel: function(locale) {
		this.onGetViewModel();
//		console.log('HomeStore.onGetHomePageModel()');
//		var self=this;
//		this.fetchPageModel(locale, function() {
//			self.onGetViewModel();
//		});
	},
	fetchPageComponent: function(pCallback) {
		var self=this;
//			self.viewConfig={
//			"component": "BasicLayout",
//			"props": {
//				"component": {
//					"content": "HomeSection"
//				},
//				"props": {
//					"content": {}
//				}
//			}
//		};
//		pCallback && pCallback(null);
		// fetch view config
		var props={view: 'HomePage'};
		ViewService.getConfig(props, function(err, config) {
			if(!err) self.viewConfig=config;
			pCallback && pCallback(err);
		});
	},
	fetchPageModel: function(locale, pCallback) {
		console.log('HomeStore.fetchPageModel()',locale,Constants.locale);
		var self=this;
// 		self.viewModel={
//			homePage: {
//				title: 'Use Sharerado to create your own online sharing or rental Business',
//				sliderData: [
//				    {file:'/images/home/photo-1425321395722-b1dd54a97cf3.jpg',type:'image'},
//				    {file:'/images/home/photo-1428340977366-8d0e3bcd82d3.jpg',type:'image'},
//				    {file:'/images/home/photo-1439396087961-98bc12c21176.jpg',type:'image'}
//	            ]
//			}
//		};
//		pCallback && pCallback(null);
		var props={locale: (locale || Constants.getLocale())};
		HomeService.getViewModel(props, function(err, model) {
 			if(!err) self.viewModel=model;
 			pCallback && pCallback(err);
 		});
	}
});

module.exports=HomeStore;