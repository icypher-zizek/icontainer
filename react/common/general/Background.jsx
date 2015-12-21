/**
 * Icon.jsx
 */
var React=require('react');

var Icon=React.createClass({
	getDefaultProps: function() {
		return {
			className: '',
			image: ''
		};
	},
	render: function() {
		var style={
			backgroundImage:'url('+this.props.image+')',
			backgroundSize:'cover',
			backgroundPosition:'center top',
			backgroundRepeat:'no-repeat'
		};
		return (<div className={this.props.className} style={style}>{this.props.children}</div>);
	}
});

module.exports=Icon;