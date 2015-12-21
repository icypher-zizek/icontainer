/**
 * SearchBarStore.js
 */
var Reflux=require('reflux');
var SearchActions=require('../actions/SearchActions');
//var Constants=require("../../../Constants");
//var SearchService=require("../../../../services/ServiceProvider").SearchService;

var SearchBarStore=Reflux.createStore({
	mixins: [],
	init : function () {
		this.listenTo(SearchActions.search, this.onSearch);
		this.resetState();
	},
	resetState: function() {
		this.state={
			value: ''
		};
	},
	getInitialState: function() {
		return this.state;
	},
	onSearch: function(value, fromHome) {
		if(fromHome) {
			console.log('updating search bar state with value:', value);
			this.state.value=value;
			this.trigger(this.state);
		}
	}
});

module.exports=SearchBarStore;