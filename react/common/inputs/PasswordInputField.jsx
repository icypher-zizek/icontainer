/**
 * @jsx React.DOM
 */

var React=require('react');

var InputField=require('./InputField.jsx');

var PasswordInputField=React.createClass({
	getDefaultProps: function(){
		disabled: false
	},
	render: function(){
		return (
			<InputField value={this.props.value} type="password"
				disabled={this.props.disabled} size={this.props.size} onChange={this.props.onChange}
				ref="inputfield">
			</InputField>
		);
	},
	getValue: function(){
		return this.refs["inputfield"].getValue();
	}
});

module.exports=PasswordInputField;