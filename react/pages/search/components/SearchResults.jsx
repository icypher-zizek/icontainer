/**
 * SearchResults.jsx
 */
var React=require('react');
var Reflux=require('reflux');
var SearchResultItemSummary=require('./SearchResultItemSummary.jsx');
var SearchResultItemDetails=require('./SearchResultItemDetails.jsx');
var ItemPane=require('./SearchResultItemSummary.jsx');
var SearchActions=require('../actions/SearchActions');
var SearchStore=require('../stores/SearchStore');
var Locale=require('../../../../utils/common/i18n/Locale');

var SearchResults=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			className: ''
		};
	},
	getInitialState: function() {
		return {
			isLoading: true,
			items: null,
			selectedItem: null
		};
	},
	onStateChanged: function(state) {
		state.items && this.setState({isLoading: false, items: state.items});
	},
	componentDidMount: function() {
		this.listenTo(SearchStore, this.onStateChanged);
		this.state.items==null && SearchActions.getCurrentResults();
	},
	onItemSelected: function(itemId) {
		console.log('SearchResults.onItemSelected()',itemId);
		if(this.state.items) {
			for(var i in this.state.items) {
				if(this.state.items[i].id==itemId) {
					return this.setState({selectedItem: this.state.items[i]});
				}
			}
		}
	},
	render: function() {
		//console.log('SearchResults.render()',this.state);
		var markup=(<div className="overlay-lgrey"></div>);
		if(!this.state.isLoading) {
			if(this.state.items==null) {
				markup=(<div></div>);
			} else if(this.state.items.length>0) {
				var self=this;
				markup=this.state.items.map(function(item, i) {
					return (<SearchResultItemSummary className="list-group-item" item={item} onClick={self.onItemSelected}></SearchResultItemSummary>);
				});
				markup=(
					<div className="row">
						<div className="col-sm-6">
							<div className="panel panel-default">
								<div className="search-results list-group">{markup}</div>
							</div>
						</div>
						<div className="col-sm-6">
							<SearchResultItemDetails item={this.state.selectedItem}></SearchResultItemDetails>
						</div>
					</div>
				);
			} else {
				markup=(
					<div className="panel panel-custom">
						<div className="panel-heading"><div className="h3 text-center">{'No Results were found!'}</div></div>
					</div>
				);
			}
		}
		return (<div className={this.props.className}>{markup}</div>);
	}
});

module.exports=SearchResults;