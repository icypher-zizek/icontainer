/**
 * HomeSectionStore.js
 */
var Reflux=require('reflux');
var HomeActions=require('../actions/HomeActions');
var HomeStore=require('./HomeStore');
var HomeSlider=require('../../../../models/home/HomeSlider');
var HomeTextContent=require('../../../../models/home/HomeTextContent');

var HomeSectionStore=Reflux.createStore({
	mixins: [],
	init : function () {
		//console.log('initializing HomeSectionStore ...');
		this.listenTo(HomeStore, this.onHomeStoreModelChanged);
		this.resetState();
	},
	resetState: function() {
		this.state={
			isLoading: true,
			textContent: new HomeTextContent(),
			slider: new HomeSlider()
		};
	},
	getInitialState: function() {
		console.log('HomeSectionStore.getInitialState()');
		return this.state;
	},
	onHomeStoreModelChanged: function(model) {
		console.log('HomeSectionStore.onHomeStoreModelChanged()');
		if(model==null) {
			this.state.isLoading=true;
		} else {
			// updating Home Section Component
			for(var i in model) {
				this.state[i]=model[i];
			}
			this.state.isLoading=false;
			console.log('updating HomeSection Component ...', this.state);
			this.trigger(this.state);
		}
	}
});

module.exports=HomeSectionStore;