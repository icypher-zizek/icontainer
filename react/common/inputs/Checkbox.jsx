/**
 * @jsx React.DOM
 */

var React=require('react');

var Checkbox=React.createClass({
	getDefaultProps: function(){
		return {
			checked: false,
			disabled: false,
			className: ''
		};
	},
	getInitialState: function(){
		return {
			checked: (this.props.checked===true || false),
		};
	},
	componentWillReceiveProps: function(newProps){
		if(newProps.checked!==true && newProps.checked!==false) return;
		this.setState({checked: newProps.checked});
	},
	render: function(){
		return (
			<input className={this.props.className} checked={this.state.checked} onChange={this.handleChange}
				disabled={this.props.disabled} type="checkbox" ref="input">
			</input>
		);
	},
	handleChange: function(event){
		console.log('Checkbox.handleChange',event);
		if(this.props.onChange==undefined){
			this.setState({checked: event.target.checked});
		} else {
			this.props.onChange(event);
		}
	},
	isChecked: function(){
		return this.refs["input"].getDOMNode().checked;
	}
});

module.exports=Checkbox;