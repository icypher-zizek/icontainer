/**
 * ItemsPage.jsx
 * @author edwin.afuba
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var ItemPane=require('./ItemPane.jsx');
var ItemActions=require('../actions/ItemActions');
var ItemStore=require('../stores/ItemStore');

/**
 * The ItemsPage Component
 */
var ItemsPage=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			mandator: 'iContainer',
			user: {},
			pageSize: 5
		};
	},
	getInitialState: function() {
		return {
			items: []
		};
	},
	componentDidMount: function() {
		this.listenTo(ItemStore, this.onUserItemsFetched);
		// get user items
		ItemActions.getItemsByUser(this.props.user);
	},
	onUserItemsFetched: function(data) {
		console.log('ItemsPage.onUserItemsFetched()',data);
		data && data.items && this.setState(data);
	},
	onItemSelected: function(itemId) {
		console.log('Item selected:',itemId);
		ItemActions.getItemById(itemId);
	},
	render: function() {
		console.log('ItemsPage.render()',this.state);
		var markup=[];
		var isEmpty=(this.state.items.length==0);
		if(isEmpty) {
			markup.push(<tr key={'itmR0'}><td className="empty" colSpan={5}>{'No Items'}</td></tr>);
			for(var i=1;i<this.props.pageSize;i++) {
				markup.push(<tr key={'itmR'+i}><td className="empty" colSpan={5}>&nbsp;</td></tr>);
			}
		} else {
			var items=[];
			for(var i=0;i<this.props.pageSize;i++) {
				items.push(this.state.items.length>i ? this.state.items[i] : 0);
			}
			var self=this;
			markup=items.map(function(item, i) {
				var key='itmR'+i;
				if(item===0) return (<tr key={key}><td className="empty" colSpan={5}>&nbsp;</td></tr>);
				var onClick=function(e) { self.onItemSelected(item.id); }
				return (
					<tr key={key} onClick={onClick} dataId={item.id}>
						<td dataId={item.id}>{item.name}</td>
						<td dataId={item.id}>{item.category}</td>
						<td dataId={item.id}>{item.price}</td>
						<td dataId={item.id}>{item.tag}</td>
						<td dataId={item.id}>{item.location}</td>
					</tr>
				);
			});
		}
		return (
			<div className="user-items ">
				<div className="panel panel-custom table-responsive">
					<div className="panel-heading"><span className="h2">{'My Items'}</span></div>
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>{'Name'}</th>
								<th>{'Category'}</th>
								<th>{'Price'}</th>
								<th>{'Tag'}</th>
								<th>{'Location'}</th>
							</tr>
						</thead>
						<tbody>{markup}</tbody>
					</table>
					<div className="panel-footer"></div>
				</div>
				<ItemPane mandator={this.props.mandator} user={this.props.user}></ItemPane>
			</div>
		);
	}
});

module.exports=ItemsPage;