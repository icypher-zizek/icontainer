/**
 * SearchStore.js
 */
var Reflux=require("reflux");
var Async=require("async");
var SearchActions=require("../actions/SearchActions");
//var SearchService=require("../../../../services/ServiceProvider").SearchService;
//var ItemService=require("../../../../services/ServiceProvider").ItemService;
var ItemStore=require("../../../user/stores/ItemStore");

var SearchStore=Reflux.createStore({
	listenables: SearchActions,
	init : function () {
		this.resetStore();
	},
	resetStore: function() {
		this.searchResults=[];
	},
	getInitialState: function() {
		return this.state;
	},
	onSearch: function(value, fromHome) {
		console.log("SearchStore.onSearch()", value);
		var self=this;
		self.searchResults=ItemStore.getItems();
		self.trigger({items: self.searchResults});
//		SearchService.search({searchValue: value}, function(err, results) {
//			if(err) { return console.log(err);
//			self.searchResults=results;
//			self.trigger(self.searchResults);
//		});
	},
	onGetCurrentResults: function() {
		console.log("SearchStore.onGetCurrentResults()", this.searchResults);
		this.trigger({items: this.searchResults});
	},
	onGetItemById: function(pItemId, pCallback) {
		console.log("SearchStore.onGetItemById()", pItemId);
		var self=this;
		var result=self.searchResults[pItemId-1];
		if(result!=undefined) {
			pCallback && pCallback(result);
			self.trigger({item: result});
		}
//		ItemService.getItemById({id: pItemId}, function(err, result) {
//			if(err) { return console.log(err);
//			pCallback && pCallback(result);
//			self.trigger({item: self.result});
//		});
	}
});

module.exports=SearchStore;