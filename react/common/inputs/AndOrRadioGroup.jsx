/** @jsx React.DOM */
var React = require('react');
var Utils=require('../utils/Utils.jsx');
var ViewUtils=require('../utils/ViewUtils.jsx');


var AndOrRadioGroup = React.createClass({
	getInitialState:function(){
		this.refOfAndOperator="refOfAndOperator"+Utils.generateId();
		this.refOfOrOperator="refOfOrOperator"+Utils.generateId();
		
		this.radioName="radioName_"+Utils.generateId();;
		
		return {
			     andOperator:this.props.value,
			     orOperator:!this.props.value
			    };
	},
	componentWillReceiveProps:function(data){
	//console.log("## AndOrRadioGroup componentWillReceiveProps : ",data);
	   this.setState({
		     andOperator:data.value,
		     orOperator:!data.value
		    });
    },
    getAndValue:function(){
    	return this.refs[this.refOfAndOperator].getDOMNode().checked;
    },
    getOrValue:function(){
    	return this.refs[this.refOfOrOperator].getDOMNode().checked;
    },
    handleChange: function() {
    	  var andOperatorValue= this.refs[this.refOfAndOperator].getDOMNode().checked;
    	  
    	  console.log("AndOrRadioGroup handleChange :",andOperatorValue);
    	  
	      this.setState({
	        		andOperator:andOperatorValue,
	        		orOperator:!andOperatorValue}
	      );
	      if(this.props.onChange!=undefined){
	    	  this.props.onChange(andOperatorValue); 
	      }
	},  
    render: function() {
    	console.log("AndOrRadioGroup render :",this.props.value);
    	var andLabel=ViewUtils.getLabel('label.and');
    	var orLabel=ViewUtils.getLabel('label.or');
    	
    	if(this.props.andLabel!=undefined){
    		andLabel=this.props.andLabel;
    	}
    	if(this.props.orLabel!=undefined){
    		orLabel=this.props.orLabel;
    	}
    	
     	return (
        		<table>
        		  <tbody>
    	    		<tr>
    	    		   <td>
    		   		      {andLabel}
    	    		   </td>
    		    		<td>
    			   		   <input ref={this.refOfAndOperator} type="radio" name={this.radioName}
    			   			     checked={this.state.andOperator} className="radio" onChange={this.handleChange}/>
    		    		</td>
    			   		<td>
    			   		   {orLabel}
    		    		</td>
    			   		<td>
    			   		    <input ref={this.refOfOrOperator} type="radio" name={this.radioName}
    			   		    	checked={this.state.orOperator} className="radio" onChange={this.handleChange}/>
    		    		</td> 
    	    		</tr>
    	    	  </tbody>
        		</table>
           );
     	{/*
      	return (
  			<div className="btn-group" data-toggle="buttons">
	  			<label className={"btn"+(this.state.andOperator?' btn-info active':' btn-default')}>
		  			<input ref={this.refOfAndOperator} type="radio" name={this.radioName}
		  				checked={this.state.andOperator} className="radio" onChange={this.handleChange}></input>{andLabel}
		        </label>
	  			<label className={"btn"+(this.state.orOperator?' btn-info active':' btn-default')}>
		  			<input ref={this.refOfOrOperator} type="radio" name={this.radioName}
	   		    		checked={this.state.orOperator} className="radio" onChange={this.handleChange}></input>{orLabel}
		        </label>
  			</div>
       );*/}
    	
    }
});

module.exports=AndOrRadioGroup;