/**
 * SearchResultItemSummary.jsx
 */
var React=require('react');
var Router=require('react-router-component');
var Link=Router.Link;
var Icon=require('../../../common/general/Icon.jsx');
var Background=require('../../../common/general/Background.jsx');
var Encrypter=require('../../../../utils/common/Encrypter'); 

/**
 * SearchResultItemSummary component
 */
var SearchResultItemSummary=React.createClass({
	getDefaultProps: function() {
		return {
			className: '',
			mandator: 'iContainer',
			item: {},
			onClick: null
		};
	},
	render: function() {
		//console.log('SearchResultItemSummary.render()',this.props);
		var item=this.props.item;
		var href=this.props.onClick ? '#' : ['',this.props.mandator,'item',item.id].join('/');
		var self=this;
		var onClick=this.props.onClick==null ? null : function(e) {
			e.preventDefault();
			self.props.onClick(item.id);
		}
		return (
			<Link className={'search-item-summary '+this.props.className} href={href} onClick={onClick}>
				<Icon className="image" image={item.image}></Icon>
				<div className="body">
					<h3>{item.name}</h3>
					<span className="line">{item.category}</span>
				</div>
			</Link>
		);
	}
});

module.exports=SearchResultItemSummary;
