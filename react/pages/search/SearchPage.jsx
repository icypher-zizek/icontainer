/**
 * SearchPage.jsx
 */
var React=require('react');
var Reflux=require('reflux');
var SearchBar=require('./components/SearchBar.jsx');
//var SearchActions=require('./actions/SearchActions.js');
//var SearchStore=require('./stores/SearchStore.js');
var SearchResults=require('./components/SearchResults.jsx');

var SearchPage=React.createClass({
	mixins: [Reflux.ListenerMixin], 
	getDefaultProps: function() {
		return {
			mandator: 'iContainer'
		};
	},
	render: function() {
		return (
			<div className="search-page">
				<div className="section-sub-heading">
					<div className="container">
						<SearchBar className="" mandator={this.props.mandator}></SearchBar>
					</div>
				</div>
				<div className="container">
					<SearchResults className="margin-top" mandator={this.props.mandator}></SearchResults>{/**/}
				</div>
			</div>
		);
	}
});

module.exports=SearchPage;