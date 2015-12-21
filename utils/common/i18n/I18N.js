/**
 * I18N.js
 */
var I18N=function() {
	this.bundle=null;
};

I18N.prototype.setBundle=function(bundle) {
	this.bundle=bundle;
	return this;
};

I18N.prototype.fetchBundle=function(pathToBundle) {
	var xmlHttp=new XMLHttpRequest();
	xmlHttp.open("GET", pathToBundle, false);
	xmlHttp.send();
	this.bundle=JSON.parse(xmlHttp.responseText);
};

I18N.prototype.getNotFoundValue=function(key) {
	return "["+key+"]";
};

I18N.prototype.get=function() {
	if(arguments.length===0) return "";
	var key=arguments[0];
	var options=arguments[arguments.length-1];
	var parameters=[];
	var endIndex=arguments.length-1;
	if(Object.prototype.toString.call(options)!=='[object Object]') {
		options={};
		endIndex=arguments.length;
	}
	for(var i=1;i<endIndex;i++){
		parameters.push(arguments[i]);
	}
	
	if(this.bundle==null) {
		console.error('Bundle is not set!');
		return this.getNotFoundValue(key);
	}
	var value=this.bundle[key];
	if(value==undefined) {
		if(options.returnNothingIfNotFound) {
			return "";
		}
		return this.getNotFoundValue(key);
	}
	for(var i=0;i<parameters.length;i++) {
		if(parameters[i]!=undefined) {			
			value=value.replace("{"+i+"}",parameters[i].toString());
		}
	}
	return value;
}

module.exports=I18N;