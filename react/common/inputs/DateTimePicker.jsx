/**
 * @jsx React.DOM
 */

var React=require('react');
var moment=require('moment');

var DateTimePicker=React.createClass({
	componentDidMount: function(){
		var ref=this;
		var $datetimepicker=this.getPickerNode();
		$datetimepicker.datetimepicker({
			format: this.props.format,
			useStrict: true,
			defaultDate: this.props.value,
			useCurrent: false,
			minDate: this.props.minDate,
			maxDate: this.props.maxDate
		}).on("dp.change",function(){
			if(ref.props.onChange==undefined) return;
			var date=$datetimepicker.data("DateTimePicker").date();
			ref.props.onChange(date);
		});
		if(this.props.disabled===true){
			$datetimepicker.data("DateTimePicker").disable();
		}
	},
	componentDidUpdate: function(){
		console.log('DateTimePicker.componentDidUpdate',this.props);
		var picker=this.getPickerNode().data("DateTimePicker");
		picker.date(this.props.value);
		picker.minDate((this.props.minDate || false));
		picker.maxDate((this.props.maxDate || false));
		if(this.props.disabled===true) picker.disable();
		else picker.enable();
	},
	render: function(){
		return (
			<div className="input-group date" ref="datetimepicker">
				<input type="text" className="form-control"></input>
				<span className="input-group-addon">
					<span className="glyphicon glyphicon-calendar"></span>
				</span>
			</div>
		);
	},
	getPickerNode: function(){
		return $jq(this.refs["datetimepicker"].getDOMNode());
	}
});

module.exports=DateTimePicker;