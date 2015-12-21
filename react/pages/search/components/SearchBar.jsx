/**
 * SearchBar.jsx
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var Link=Router.Link;
var Input=require('../../../common/inputs/InputField.jsx');
var SearchActions=require('../actions/SearchActions');
var SearchBarStore=require('../stores/SearchBarStore');

var SearchBar=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			mandator: 'iContainer',
			className: '',
			homeView: false
		};
	},
	getInitialState: function() {
		return SearchBarStore.getInitialState();
	},
	componentDidMount: function() {
		this.listenTo(SearchBarStore, this.onStateChanged);
		this.refs['searchBox'].getDOMNode().focus();
		var executeSearch=(this.state.value && this.state.value.length>0)
		executeSearch && this.onSearch();
	},
	onStateChanged: function(state) {
		this.setState(state);
	},
	onSearch: function() {
		var searchValue=this.refs['searchBox'].getValue();
		console.log('SearchBar.onSearch() from home',this.props.homeView,searchValue);
		SearchActions.search(searchValue, this.props.homeView);
		if(this.props.homeView) {
			console.log('navigating to search page ...');
			this.refs['invLink'].navigate(['','search'].join('/'));
		}
	},
	searchKeyHandler: function(event) {
	    if (event.keyCode === 13) {
	    	this.onSearch();
	    }
	},
	renderHomeView: function() {
		return (
			<div className="search-bar home-view">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<Input className="search-box form-control" ref="searchBox" onKeyUp={this.searchKeyHandler}></Input>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2 col-md-offset-5">
						<button className="btn btn-block btn-custom search-btn" onClick={this.onSearch}>{'Search'}</button>
					</div>
				</div>
			</div>
		);
	},
	renderDefaultView: function() {
		return (
			<div className="row search-bar search-view">
				<div className="col-md-2 col-sm-3"><span className="title">{'iContainer'}</span></div>
				<div className="col-md-8 col-sm-6">
					<Input className="search-box form-control" ref="searchBox" onKeyUp={this.searchKeyHandler} value={this.state.value}></Input>
				</div>
				<div className="col-md-2 col-sm-3">
					<button className="search-btn btn btn-custom btn-block" onClick={this.onSearch}>{'Search'}</button>
				</div>
			</div>
		);
	},
	render: function() {
		console.log('SearchBar.render()',this.state);
		return (
			<div className={this.props.className}>
				{this.props.homeView ? this.renderHomeView() : this.renderDefaultView()}
				<Link ref="invLink" href=""></Link>
			</div>
		);
	}
});

module.exports=SearchBar;