/**
 * @jsx React.DOM
 */
var React 	= require('react');
var Router 	= require('react-router-component');
var Link	= Router.Link;

var HighlightedLink = React.createClass({
	mixins: [Router.NavigatableMixin],
	getDefaultProps: function() {
		return {
			checkExactUrl: false,
			isDefault: false,
			activeClassName: 'active'
		};
	},
	render: function() {
    	//var { activeClassName, ...other } = this.props;
		var className=this.props.className;
		if(this.props.activeClassName && this.isActive()) {
			className+=' '+this.props.activeClassName;
		}
		return (<Link id={this.props.id} href={this.props.href} className={className}>{this.props.children}</Link>);
	},
	isActive: function() {
		var found;
		if(this.props.checkExactUrl) {
			found=(this.getPath()===this.props.href);
		} else {
			found=(this.getPath().indexOf(this.props.href)>-1);
		}
		return found;
	}
});

module.exports = HighlightedLink;