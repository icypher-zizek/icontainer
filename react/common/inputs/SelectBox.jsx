/**
 * @jsx React.DOM
 */

var React	= require('react');
var Utils	= require('../utils/Utils.jsx');

var SelectBox=React.createClass({
	getDefaultProps: function(){
		return {
			value: '',
			options: [],
			multiple: false,
			disabled: false,
			onChange: function(value) {},
			className: ''
		};
	},
	getInitialState: function(){
		return {
			value: ''
		};
	},
	componentDidMount: function() {
		this.style();
		if($jq) {
			$jq(this.refs['select'].getDOMNode()).on('change', this.props.onChange);
		}
	},
	componentWillUnmount: function() {
		if($jq) {
			$jq(this.refs['select'].getDOMNode()).selectpicker('destroy');
		}
	},
	style: function() {
		// boostraping for browser
		if($jq) {
			$jq(this.refs['select'].getDOMNode()).selectpicker('render');
		}
	},
	render: function() {
		var ref=this, base=Utils.generateRandomNr();
		var options=this.props.options.map(function(option, i) {
			var key=base+'_'+i, label='', value='';
			if(option instanceof String) {
				label=option; value=label;
			} else {
				label=option.label; value=option.value;
			}
			var selected=((Utils.isObjectSet(ref.props.value) && ref.props.value!='')||(i===0))?'selected':'';
			return (<option value={value} selected={selected}>{label}</option>); 
		});
		return (
			<select ref="select" 
				size={this.props.size} 
				onChange={this.props.onChange}
				disabled={this.props.disabled?'disabled':''}
				multiple={this.props.multiple?'multiple':''}
				className={this.props.className}>
				{options}
			</select>
		);
	},
	getValue: function(cb){
		console.log('SelectBox.getValue()',this.refs['select'].getDOMNode());
		return this.refs['select'].getDOMNode().value;
	}
});

module.exports=SelectBox;