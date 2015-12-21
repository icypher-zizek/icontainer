var Utils={};

Utils.isArray=function(array){
	return Object.prototype.toString.call(array)==="[object Array]";
};

Utils.isObject=function(object){
	return Object.prototype.toString.call(object)==="[object Object]";
};

Utils.isString=function(string){
	return Object.prototype.toString.call(string)==="[object String]";
};

Utils.isNumber=function(number){
	return Object.prototype.toString.call(number)==="[object Number]";
};

Utils.isFunction=function(fn){
	return Object.prototype.toString.call(fn)==="[object Function]";
};

Utils.isEmpty=function(object){
	if(object===null || object===undefined){
		return true;
	}
	if(Utils.isArray(object) || Utils.isString(object)){
		if(object.length===0){
			return true;
		}else{
			return false;
		}
	}
	if(Utils.isNumber(object)){
		return false;
	}
	for(var key in object){
		if(object.hasOwnProperty(key)){
			return false;
		}
	}
	return true;
};

/**
 * Validate email value
 */
Utils.isEmailValid=function(email) {
	var isValid=false;
	var re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	isValid=re.test(email);
	return isValid;
};

/**
 * Extracts URL Parameters from a given string
 */
Utils.getUrlParams=function(pUrl, pParams) {
	var params=pParams ? JSON.parse(JSON.stringify(pParams)) : {};
	var url=pUrl;
	if(url) {
		var pos=url.indexOf('?');
		var tokens=(pos==-1 ? url : (pos==0 ? url.replace('?','') : url.split('?')[1]));
		tokens=tokens.split('&'); 
		for(var i in tokens) {
			var tmp=tokens[i].split('=');
			params[tmp[0]]=tmp[1];
		}
	}
	return params;
};

module.exports=Utils;