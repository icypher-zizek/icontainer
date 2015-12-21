var Utils=require('./Utils');

function Serializable(){
	Object.defineProperty(this,"_serializableData",{value: {}});
}

var register=function(serializable){
	var serialID=serializable.serialID;
	if(!Utils.isString(serialID) || Utils.isEmpty(serialID)){
		throw Error("Invalid serialID '"+serialID+"'");
	}
	if(Serializable["sMap"][serialID]){
		throw Error("serialID '"+serialID+"' already in use");
	}
	if(!(serializable.prototype instanceof Serializable)){
		throw Error("object is not Serializable");
	}
	if(!Utils.isFunction(serializable.deserialize)){
		throw Error("deserialize is not implemented");
	}
	Serializable["sMap"][serialID]=serializable;
};

var deserialize=function(object){
	var serialID=null;
	var serialized=null;
	for(var key in object){
		if(!object.hasOwnProperty(key)){
			continue;
		}
		var match=key.match(Serializable.SERIAL_ID_PATTERN);
		if(!match){
			continue;
		}
		serialID=match[1];
		serialized=object[key];
		break;
	}
	var serializable=Serializable["sMap"][serialID];
	if(!serializable){
		throw Error("unknown serialID '"+serialID+"'");
	}
	return serializable.deserialize(object[Serializable.SERIAL_PREFIX+serialID]);
};

Object.defineProperty(Serializable,"sMap",{value: {}});
Object.defineProperty(Serializable,"register",{value: register});
Object.defineProperty(Serializable,"deserialize",{value: deserialize});
Object.defineProperty(Serializable,"SERIAL_PREFIX",{value: "##"});
Object.defineProperty(Serializable,"REF_PREFIX",{value: "::"});
Object.defineProperty(Serializable,"SERIAL_ID_PATTERN",{value: new RegExp("^"+Serializable.SERIAL_PREFIX+"(.+)$")});
Object.defineProperty(Serializable,"REF_INDEX_PATTERN",{value: new RegExp("^"+Serializable.REF_PREFIX+"([0-9]+)$")});

Serializable.prototype.serialize=function(){
	if(!this._constructor.serialID){
		throw Error("Missing serialID");
	}
	
	var serialized={};
	serialized[Serializable.SERIAL_PREFIX+this._constructor.serialID]=doSerialize(this["_serializableData"]);
	return serialized;
};

var doSerialize=function(object,partiallySerialized){
	partiallySerialized=partiallySerialized || {
		refs: [],
		data: null
	};
	var data=object;
	if(Utils.isObject(object)){
		if(object instanceof Serializable){
			partiallySerialized.refs.push(object.serialize());
			data=Serializable.REF_PREFIX+(partiallySerialized.refs.length-1);
		}else{
			data={};
			for(var key in object){
				if(!object.hasOwnProperty(key)){
					continue;
				}
				data[key]=doSerialize(object[key],partiallySerialized).data
			}
		}
	}else if(Utils.isArray(object)){
		data=[];
		for(var i=0;i<object.length;i++){
			data.push(doSerialize(object[i],partiallySerialized).data);
		}
	}
	partiallySerialized.data=data;
	return partiallySerialized;
}

module.exports=Serializable;