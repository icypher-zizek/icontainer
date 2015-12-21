/**
 * HomePage.jsx
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var Link=Router.Link;
var FullPageMixin=require('../mixins/FullPageMixin.jsx');
var SearchBar=require('../search/components/SearchBar.jsx');

var HomePage=React.createClass({
	mixins: [Reflux.ListenerMixin, FullPageMixin], 
	getDefaultProps: function() {
		return {
			mandator: 'iContainer'
		};
	},
	getInitialState: function() {
		this.pageId='home-page';
		return {};
	},
	componentDidMount: function() {
	},
	render: function() {
		return (
			<div id={this.pageId} className="home-page">
				<div className="section-heading">
					<div className="container">{'iContainer'}</div>
				</div>
				<SearchBar className="container" mandato={this.props.mandator} homeView={true}></SearchBar>
			</div>
		);
	}
});

module.exports=HomePage;