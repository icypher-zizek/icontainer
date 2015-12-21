/**
 * SearchResultItemDetails.jsx
 */
var React=require('react');
var Router=require('react-router-component');
var Link=Router.Link;
var Icon=require('../../../common/general/Icon.jsx');
var Background=require('../../../common/general/Background.jsx');
var Encrypter=require('../../../../utils/common/Encrypter'); 

/**
 * SearchResultItemDetails component
 */
var SearchResultItemDetails=React.createClass({
	getDefaultProps: function() {
		return {
			className: '',
			mandator: 'iContainer',
			item: null
		};
	},
	render: function() {
		console.log('SearchResultItemDetails.render()',this.props.item);
		var item=this.props.item;
		return item==null ? (<div></div>) : (
			<div className="search-item-details panel panel-custom">
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
	}
});

module.exports=SearchResultItemDetails;
