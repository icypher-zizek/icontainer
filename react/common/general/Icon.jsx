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
			backgroundSize:'contain',
			backgroundPosition:'center center',
			backgroundRepeat:'no-repeat'
		};
		return (<div className={this.props.className} style={style}></div>);
	}
});

module.exports=Icon;