/**
 * ItemPane.jsx
 */
var React=require('react');
var Reflux=require('reflux');
var Background=require('../../common/general/Background.jsx');
var ItemActions=require('../actions/ItemActions');
var ItemStore=require('../stores/ItemStore');

var ItemPane=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			mandator: 'iContainer',
			user: {},
		};
	},
	getInitialState: function() {
		return {
			item: null
		};
	},
	componentDidMount: function() {
		this.listenTo(ItemStore, this.onItemFetched);
	},
	onItemFetched: function(data) {
		console.log('ItemPane.onItemFetched()',data);
		data && data.item && this.setState(data);
	},
	render: function() {
		var item=this.state.item
		var markup=item==null ? (<div></div>) : (
			<div className="item-pane panel panel-custom">
				<div className="panel-heading"><span className="h3">{'Item: '+item.name}</span></div>
				<div className="panel-body">
					<div className="row">
						<div className="col-md-4">
							<Background className="item-image" image={item.image}></Background>
						</div>
						<div className="col-md-8">
							<div className="panel panel-custom table-responsive">
								<table className="table table-condensed table-striped">
									<tr><td className="bold width-one-fifth">{'Category'}</td><td>{item.category}</td></tr>
									<tr><td className="bold">{'Description'}</td><td>{item.description}</td></tr>
									<tr><td className="bold">{'Tag'}</td><td>{item.tag}</td></tr>
									<tr><td className="bold">{'Price'}</td><td>{item.price}</td></tr>
									<tr><td className="bold">{'Size'}</td><td>{item.size}</td></tr>
									<tr><td className="bold">{'Color'}</td><td>{item.color}</td></tr>
									<tr><td className="bold">{'Location'}</td><td>{item.location}</td></tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		); 
		return markup
	}
});

module.exports=ItemPane;