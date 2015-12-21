var Utils=require('./Utils');
var Serializable=require('./Serializable');

var ModelTransposer={};

ModelTransposer.liquefy=function(object){
	var data=object;
	if(Utils.isObject(object)){
		if(object instanceof Serializable){
			data=object.serialize();
		}else{
			data={};
			for(var key in object){
				if(!object.hasOwnProperty(key)){
					continue;
				}
				data[key]=ModelTransposer.liquefy(object[key]);
			}
		}
	}else if(Utils.isArray(object)){
		data=[];
		for(var i=0;i<object.length;i++){
			data.push(ModelTransposer.liquefy(object[i]));
		}
	}
	return data;
};

ModelTransposer.solidify=function(object){
	var data=object;
	if(Utils.isObject(object)){
		data={};
		for(var key in object){
			if(!object.hasOwnProperty(key)){
				continue;
			}
			var match=key.match(Serializable.SERIAL_ID_PATTERN);
			if(match){
				data=Serializable.deserialize(object);
				break;
			}else{
				data[key]=ModelTransposer.solidify(object[key]);
			}
		}
	}else if(Utils.isArray(object)){
		var data=[];
		for(var i=0;i<object.length;i++){
			data.push(ModelTransposer.solidify(object[i]));
		}
	}
	return data;
};

//var Conversation=require('../models/Conversation');
//var User=require('../models/User');
//var ChatMessage=require('../models/ChatMessage');
//var UserTypes=require('../models/UserTypes');
//
//var p=new User({name: "Makien", surname: "Osman", type: UserTypes.PATIENT});
//var d=new User({name: "Sadet", surname: "Alcic", type: UserTypes.DOCTOR});
//var c=new Conversation({doctor: d, patient: p, messages: [
//	new ChatMessage({author: p, content: "Hi Sadet"}),
//	new ChatMessage({author: d, content: "Hi Makien"})
//]});
//var o={conversation: c, something: "else"};
//
//var l=ModelTransposer.liquefy(o);
//var s=ModelTransposer.solidify(l)
//console.log(s.conversation instanceof Conversation); //true
//console.log(s.something==="else"); //true
//console.log(s.conversation.doctor instanceof User); //true
//console.log(s.conversation.patient instanceof User); //true
//console.log(s.conversation.doctor.type===UserTypes.DOCTOR); //true
//console.log(s.conversation.patient.type===UserTypes.PATIENT); //true
//console.log(s.conversation.messages.length===2); //true
//for(var i=0;i<s.conversation.messages.length;i++){
//	console.log(s.conversation.messages[i].author instanceof User) //true
//}

module.exports=ModelTransposer;