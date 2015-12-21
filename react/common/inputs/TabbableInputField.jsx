/**
 * @jsx React.DOM
 */

var React=require('react');

var TAB_KEY_CODE=9;

var TabbableInputField=React.createClass({
	getInitialState: function(){
		return {
			value: (this.props.value || "")
		}
	},
	componentWillReceiveProps: function(newProps){
		if(newProps.value){
			this.setState({
				value: newProps.value
			});
		}
	},
	componentDidUpdate: function(){
		var resetState=false;
		if(this.state.fireChange){
			this.handleChange();
			resetState=true;
		}
		if(this.state.selectionStart!=null){
			this.getDOMNode().setSelectionRange(this.state.selectionStart,this.state.selectionStart);
			resetState=true;
		}
		if(resetState){
			this.setState({
				fireChange: false,
				selectionStart: null
			});
		}
	},
	render: function(){
		var {value,onChange,...props}=this.props;
		return(
			<input value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} ref="input" {...props}></input>
		);
	},
	handleKeyDown: function(event){
		if(event.keyCode==TAB_KEY_CODE){
			var selectionStart=this.getDOMNode().selectionStart;
			var selectionEnd=this.getDOMNode().selectionEnd;
			var oldValue=event.target.value;
			var newValue=oldValue.slice(0,selectionStart)+"\t"+oldValue.slice(selectionEnd);
			this.setState({
				value: newValue,
				fireChange: true,
				selectionStart: selectionStart+1
			});
			event.preventDefault();
		}
	},
	handleChange: function(event){
		this.setState({
			value: this.getDOMNode().value
		});
		if(this.props.onChange){
			this.props.onChange(event);
		}
	}
});

module.exports=TabbableInputField;