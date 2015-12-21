var io=require('socket.io-client');
var Topics=require('../common/Topics');

function ChatProxy(paramsObject){
	this.params=paramsObject;
	this.host=this.params.host;
	this.secure=this.params.secure;
	this.options={forceNew: true}
	if(this.params.secure) { this.options.secure=this.params.secure; }
}

ChatProxy.prototype.connect=function() {
	this.socket=io(this.host, this.options);
	if(this.onConnect){
		this.socket.on("connect",this.onConnect);
	}
	if(this.onDisconnect){
		this.socket.on("disconnect",this.onDisconnect);
	}
	if(this.onChatJoined){
		this.socket.on(Topics.CHAT_JOINED,this.onChatJoined);
	}
	if(this.onChatLeft){
		this.socket.on(Topics.CHAT_LEFT,this.onChatLeft);
	}
	if(this.onChatMessage){
		this.socket.on(Topics.CHAT_MESSAGE,this.onChatMessage);
	}
	
	if(this.onCalling){
		this.socket.on(Topics.CALLING,this.onCalling);
	}
	if(this.onCallAccepted){
		this.socket.on(Topics.CALL_ACCEPTED,this.onCallAccepted);
	}
	if(this.onCallRejected){
		this.socket.on(Topics.CALL_REJECTED,this.onCallRejected);
	}
	if(this.onCallDropped){
		this.socket.on(Topics.CALL_DROPPED,this.onCallDropped);
	}
	if(this.onCallMessage){
		this.socket.on(Topics.CALL_MESSAGE,this.onCallMessage);
	}
	
	if($jq) {
		var ref=this;
//		console.log('##############################################');
//		console.log('## Registering Window Event: beforeunload ! ##');
//		console.log('##############################################');
		$jq(window).on('beforeunload', function(){
			ref.socket.close();
		});
	}
};

ChatProxy.prototype.disconnect=function(){
	this.socket.disconnect();
};


ChatProxy.prototype.joinChat=function(params){
	this.socket.emit(Topics.JOIN_CHAT,params);
};

ChatProxy.prototype.leaveChat=function(params){
	this.socket.emit(Topics.LEAVE_CHAT,params);
};

ChatProxy.prototype.sendChatMessage=function(params){
	this.socket.emit(Topics.CHAT_MESSAGE,params);
};

ChatProxy.prototype.onChatJoined=function(fn){
	this.onChatJoined=fn;
};

ChatProxy.prototype.onChatLeft=function(fn){
	this.onChatLeft=fn;
};

ChatProxy.prototype.onChatMessage=function(fn){
	this.onChatMessage=fn;
};




ChatProxy.prototype.makeCall=function(params){
	this.socket.emit(Topics.CALL,params);
};

ChatProxy.prototype.acceptCall=function(params){
	this.socket.emit(Topics.ACCEPT_CALL,params);
};

ChatProxy.prototype.rejectCall=function(params){
	this.socket.emit(Topics.REJECT_CALL,params);
};

ChatProxy.prototype.dropCall=function(params){
	this.socket.emit(Topics.DROP_CALL,params);
};

ChatProxy.prototype.requestCallStatus=function(params){
	this.socket.emit(Topics.CALL_STATUS,params);
};

ChatProxy.prototype.sendCallMessage=function(params){
	this.socket.emit(Topics.CALL_MESSAGE,params);
};

ChatProxy.prototype.onConnect=function(fn){
	this.onConnect=fn;
};

ChatProxy.prototype.onDisconnect=function(fn){
	this.onDisconnect=fn;
};

ChatProxy.prototype.onCalling=function(fn){
	this.onCalling=fn;
};

ChatProxy.prototype.onCallAccepted=function(fn){
	this.onCallAccepted=fn;
};

ChatProxy.prototype.onCallRejected=function(fn){
	this.onCallRejected=fn;
};

ChatProxy.prototype.onCallDropped=function(fn){
	this.onCallDropped=fn;
};

ChatProxy.prototype.onCallMessage=function(fn){
	this.onCallMessage=fn;
};

module.exports=ChatProxy;