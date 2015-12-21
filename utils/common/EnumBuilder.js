var Enum=require('./Enum');
var Serializable=require('./Serializable');
var Utils=require('./Utils');

function EnumBuilder(params){
	if(Utils.isEmpty(params)){
		throw new Error("Invalid parameters");
	}
	var serialID=params.serialID;	
	var enums=params.data;
	if(!Utils.isString(serialID) || Utils.isEmpty(serialID) || Utils.isEmpty(enums)){
		throw new Error("Invalid parameters");
	}
	var E;
	if(Utils.isArray(enums)){
		E=array_setup.call(this,serialID,enums);
	}else if(Utils.isObject(enums)){
		E=object_setup.call(this,serialID,enums);
	}else{
		throw new Error("Invalid parameters");
	}
	Object.defineProperty(E,"getValueOf",{value: Enum.getValueOf});
	Object.defineProperty(E,"values",{value: Enum.values});
	Object.defineProperty(E,"deserialize",{value: Enum.deserialize});
	Object.defineProperty(E,"serialID",{value: serialID});
	Serializable.register(E);
	return E;
}

var array_setup=function(serialID,enums){
	function E(name,ordinal){
		Enum.call(this,name,ordinal,null);
		this._constructor=E;
	}
	E.prototype=new Enum;
	for(var i=0;i<enums.length;i++){
		if(!Utils.isString(enums[i])){
			throw new Error("Arguments must be strings");
		}
		Object.defineProperty(E,enums[i],{enumerable: true, value: new E(enums[i],i)});
		
	}
	return E;
};

var object_setup=function(serialID,enums){
	function E(name,ordinal,value){
		Enum.call(this,name,ordinal,value);
		Object.defineProperty(this,"serialID",{value: serialID});
	}
	E.prototype=new Enum;
	var i=0;
	for(var enumName in enums){
		if(!enums.hasOwnProperty(enumName)){
			continue;
		}
		Object.defineProperty(E,enumName,{enumerable: true, value: new E(enumName,i++,enums[enumName])});
	}
	return E;
};

module.exports=EnumBuilder;