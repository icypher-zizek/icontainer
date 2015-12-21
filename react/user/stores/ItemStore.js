/**
 * ItemStore.js
 */
var Reflux=require('reflux');
var ItemActions=require('../actions/ItemActions');
var LoginStore=require('../../pages/login/stores/LoginStore');

var ItemStore=Reflux.createStore({
	mixins: [],
    listenables: ItemActions,
	init : function () {
		this.items=[
			{
				id:1, name:'Item 1',category:'Disturbia', description:'This is just a test item',
				size:'635cm', color:'red', price:'$10', tag:'small',location:'Auburn', owner: 1,
				image:'/images/question-mark.jpg'
			},
			{
				id:2, name:'Item 2',category:'Simplistic', description:'This is just a test item',
				size:'585cm', color:'blue', price:'$240', tag:'big',location:'Berlin', owner: 1,
				image:'/images/question-mark.jpg'
			}
		];
	},
	onGetItemsByUser: function(user) {
		console.log('ItemStore.onGetItemsByUser()',user);
		this.trigger({items: this.items});
	},
	onGetItemById: function(itemId) {
		console.log('ItemStore.onGetItemById()',itemId);
		this.items[itemId-1] && this.trigger({item: this.items[itemId-1]});
	},
	onSaveItem: function(item, pCallback) {
		console.log('ItemStore.onSaveItem()',item);
		item.id=this.items.length+1;
		this.items.push(item);
		pCallback && pCallback(null, item.id);
	},
	
	getItems: function() {
		return this.items;
	}
});

module.exports=ItemStore;