var Serializable=require('./Serializable');
var Utils=require('./Utils');

function POJO(params){
	Serializable.call(this);
	for(var attribute in params){
		if(!params.hasOwnProperty(attribute)){
			continue;
		}
		this[attribute]=params[attribute];
	}
};

POJO.prototype=new Serializable;

var deserialize=function(params){
	var deserialized=doDeserialize(params);
	return new this(deserialized);
};

var doDeserialize=function(params){
	var refs=params.refs;
	var object=params.data;
	var data=object;
	if(Utils.isString(object)){
		var match=object.match(Serializable.REF_INDEX_PATTERN);
		if(match){
			data=Serializable.deserialize(refs[match[1]])
		}
	}else if(Utils.isObject(object)){
		data={};
		for(var key in object){
			if(!object.hasOwnProperty(key)){
				continue;
			}
			data[key]=doDeserialize({refs: refs, data: object[key]});
		}
	}else if(Utils.isArray(object)){
		data=[];
		for(var i=0;i<object.length;i++){
			data.push(doDeserialize({refs: refs, data: object[i]}));
		}
	}
	return data;
};

Object.defineProperty(POJO,"deserialize",{value: deserialize});

module.exports=POJO;