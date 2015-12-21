/**
 * @jsx React.DOM
 */

var React=require('react');

var InputField=require('./InputField.jsx');

var VariableInputField=React.createClass({
	render: function(){
		return (
			<InputField value={this.props.value} ref="inputfield" onChange={this.onChange}
				disabled={this.props.disabled}>
			</InputField>
		);
	},
	onChange: function(){
		console.log('VariableInputField.onChange');
		var value=this.getValue();
		var newValue=null;
		if(value.length===0) newValue="$";
		else if(value.charAt(0)!=="$") newValue="$".concat(value);
		if(newValue!==null){
			this.props.onChange(newValue)
		} else if(this.props.onChange!=undefined){
			this.props.onChange();
		}
	},
	getValue: function(){
		return this.refs["inputfield"].getValue();
	}
});

module.exports=VariableInputField;