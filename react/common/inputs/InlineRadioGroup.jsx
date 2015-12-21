/**
 * @jsx React.DOM
 */

var React=require('react');

var Radio=require('./Radio.jsx');

var InlineRadioGroup=React.createClass({
	getDefaultProps: function() {
		return {
			className: ''
		};
	},
	render: function() {
		var ref=this;
		var name=this.props.name;
		var group=this.props.options.map(function(option, i){
			return (
				<label className="radio-inline" key={i}>
					<Radio disabled={option.disabled||ref.props.disabled} name={name}
						checked={option.selected}
						onChange={ref.onChange} ref={"radio_"+i}></Radio> {option.label}
				</label>
			);
		});
		return (
			<div className={this.props.className}>
				{group}
			</div>
		);
	},
	onChange: function() {
		if(this.props.onChange==undefined) return;
		for(var i=0;i<this.props.options.length;i++){
			if(this.refs["radio_"+i].isSelected()){
				console.log('InlineRadioGroup.onChange',i);
				this.props.onChange(i);
				return;
			}
		}
	}
});

module.exports=InlineRadioGroup;