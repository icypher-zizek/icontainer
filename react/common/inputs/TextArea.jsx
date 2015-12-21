/**
 * @jsx React.DOM
 */

var React=require('react');

var TextArea=React.createClass({
	getDefaultProps: function(){
		return {
			value: '',
			disabled: false
		};
	},
	getInitialState: function() {
		return {
			value: this.props.value
		};
	},
	componentWillReceiveProps:function(nextProps){
		this.setState({value: nextProps.value});
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
		this.props.onChange && this.props.onChange(event);
	},
	getValue: function(cb){
		return this.refs["textarea"].getDOMNode().value;
	},
	reset: function() {
	    this.setState({value: this.props.value});
	},
	render: function() {
		return (
			<textarea ref="textarea" {...this.props}
				value={this.state.value} 
				onChange={this.handleChange}>
			</textarea>
		);
	}
});

module.exports=TextArea;