/**
 * @jsx React.DOM
 */

var React=require('react');

var InputField=React.createClass({
	getDefaultProps: function(){
		return {
			value: '',
			name: null,
			disabled: false,
			type: "text",
			style: {},
			className: 'form-control'
		};
	},
	getInitialState: function(){
		return {
			value: this.props.value
		};
	},
	componentWillReceiveProps:function(nextProps){
		this.setState({value: nextProps.value});
	},
	handleChange:function(event) {
		this.setState({value: event.target.value});
		this.props.onChange && this.props.onChange(event);
	},
	getValue: function(){
		return this.refs['inputfield'].getDOMNode().value;
	},
	reset: function() {
	    this.setState({value: this.props.value});
	},
	render: function() {
		return (
			<input ref="inputfield" {...this.props}
				value={this.state.value} 
				onChange={this.handleChange} >
			</input>
		);
	}
});

module.exports=InputField;