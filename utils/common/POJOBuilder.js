var POJO=require('./POJO');
var Serializable=require('./Serializable');
var Utils=require('./Utils');

function POJOBuilder(params){
	if(Utils.isEmpty(params)){
		throw new Error("Invalid parameters");
	}
	var serialID=params.serialID;
	var attributes=params.attributes;
	var SuperClass=params["extends"] || POJO;
	if(!Utils.isString(serialID) || Utils.isEmpty(serialID) || Utils.isEmpty(attributes)){
		throw new Error("Invalid parameters");
	}
	var P;
	if(Utils.isArray(attributes) || Utils.isObject(attributes)){
		function P(p){
			p=p || {};
			var attributesToIgnore=p.__ignores;
			delete p.__ignores;
			
			if(Utils.isArray(attributes)){
				var genXetter=function(i){
					return {
						setter: function(value){
							this["_serializableData"][attributes[i]]=value;
						},
						getter: function(){
							return this["_serializableData"][attributes[i]];
						}
					}
				}
				for(var i=0;i<attributes.length;i++){
					var attribute=attributes[i];
					var ignore=shallIgnore(attribute,attributesToIgnore);
					if(ignore){
						continue;
					}
					var xetter=genXetter(i);
					Object.defineProperty(this,attribute,{
						enumerable: true,
						set: xetter.setter.bind(this),
						get: xetter.getter.bind(this)
					});
				}
			}else{
				var genXetter=function(attribute){
					return {
						setter: function(value){
							this["_serializableData"][attribute]=value;
						},
						getter: function(){
							return this["_serializableData"][attribute];
						}
					}
				}
				for(var attribute in attributes){
					var ignore=shallIgnore(attribute,attributesToIgnore);
					if(ignore){
						continue;
					}
					if(attributes[attribute]!==undefined){
						Object.defineProperty(this,attribute,{
							enumerable: true,
							value: attributes[attribute]
						});
					}else{
						var xetter=genXetter(attribute);
						Object.defineProperty(this,attribute,{
							enumerable: true,
							set: xetter.setter.bind(this),
							get: xetter.getter.bind(this)
						});
					}
				}
			}
			if(SuperClass!==POJO){
				p.__ignores=attributes;
			}
			SuperClass.call(this,p);
			this._constructor=P;
		}
		P.prototype=new SuperClass;
		Object.defineProperty(P,"deserialize",{value: SuperClass.deserialize});
		Object.defineProperty(P,"serialID",{value: serialID});
		Serializable.register(P);
	}else{
		throw new Error("Invalid parameters");		
	}
	return P;
}

var shallIgnore=function(attribute,attributesToIgnore){
	if(Utils.isArray(attributesToIgnore)){
		for(var j=0;j<attributesToIgnore.length;j++){
			if(attribute===attributesToIgnore[j]){
				return true;
			}
		}
	}else if(Utils.isObject(attributesToIgnore)){
		for(var attributeToIgnore in attributesToIgnore){
			if(!attributesToIgnore.hasOwnProperty(attributeToIgnore)){
				continue;
			}
			if(attribute===attributeToIgnore){
				return true;
			}
		}	
	}
	return false;
}

module.exports=POJOBuilder;