var Serializable=require('./Serializable');

function Enum(name,ordinal,value){
	Serializable.call(this);
	Object.defineProperty(this,"name",{value: name});
	Object.defineProperty(this,"ordinal",{value: ordinal});
	Object.defineProperty(this,"value",{value: value});	
	this["_serializableData"]["name"]=name;
};

Enum.prototype=new Serializable;

var valueOf=function(string){
	if(this[string] && this.hasOwnProperty(string)){
		return this[string];
	}
	return null;
};

var values=function(){
	var values=[];
	for(var v in this){
		if(!this.hasOwnProperty(v)){
			continue;
		}
		values.push(this[v]);
	}
	return values;
};

var deserialize=function(object){
	var enumName=object.data.name;
	return this.getValueOf(enumName);
};

Object.defineProperty(Enum,"getValueOf",{value: valueOf});
Object.defineProperty(Enum,"values",{value: values});
Object.defineProperty(Enum,"deserialize",{value: deserialize});

module.exports=Enum;