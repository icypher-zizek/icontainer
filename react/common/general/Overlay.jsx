/**
 * @jsx React.DOM
 */

var React=require('react');
var Reflux=require('reflux');

var OverlayActions=require('./actions/OverlayActions.jsx');
var OverlayStore=require('./stores/OverlayStore.jsx');

var Overlay=React.createClass({
	mixins: [Reflux.ListenerMixin],
	timer: null,
	getDefaultProps: function(){
		return {
			turnOffTime: 3000 //disables Overlay automatically after n ms. 0 =won't turn off automatically
		};
	},
	getInitialState: function(){
		this.listenTo(OverlayActions.hasBeenCleared,this.onClear);
		this.listenTo(OverlayActions.hasBeenBlocked,this.onBlock);
		this.listenTo(OverlayActions.register,this.onBlock);
		return {
			visible: false
		};
	},
	render: function(){
		if(!this.state.visible){
			return null;
		}
		var className="ui-overlay";
		var style={
			zIndex: 10000,
			position: 'absolute',
			top: '0pt',
			left: '0pt',
			overflow: 'hidden'
		};
		
		return (
			<div className={className} style={style}>
				<div className="ui-widget-overlay" style={{top:'0pt',left:'0pt'}}></div>
			</div>
		);
	},
	setTimer: function(duration){
		var turnOffTime=this.props.turnOffTime;
		if(duration!=undefined){
			turnOffTime=duration;
		}
		if(turnOffTime==null || turnOffTime<=0 || this.timer!=null){
			return;
		}
		var ref=this;
		this.timer=setTimeout(function(){
			console.log("Overlay is clearing because of timeout.");
			OverlayActions.clear();
		},turnOffTime);
	},
	clearTimer: function(){
		if(this.timer==null){
			return;
		}
		clearTimeout(this.timer);
		this.timer=null;
	},
	onClear: function(){
		this.clearTimer();
		this.setState({visible: false});
	},
	onBlock: function(thisObject,duration){
		this.setTimer(duration);
		this.setState({visible: true});
	}
});

module.exports=Overlay;