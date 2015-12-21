/**
 * @jsx React.DOM
 */

var React=require('react');

var Radio=React.createClass({
	getDefaultProps: function(){
		return {
			disabled: false
		};
	},
	onChange: function(a,b,c) {
		if(this.props.onChange==undefined) return;
		console.log('Radio.onChange');
		this.props.onChange(this.isSelected());
	},
	isSelected: function(){
		return $jq(this.getDOMNode()).is(':checked');
	},
	select: function(value){
		if(value===true){
			$jq(this.getDOMNode()).attr("checked","checked");
		} else {
			$jq(this.getDOMNode()).removeAttr("checked");
		}
	},	
	render: function(){
		return (
			<input disabled={this.props.disabled} type="radio"
				name={this.props.name}
				defaultChecked={this.props.defaultChecked}
				checked={this.props.checked}
				onChange={this.onChange}>
			</input>
		);
	}
});

module.exports=Radio;