/**
 * JsonDatasource.js
 */
var Datasource=require('./Datasource');

/**
 * JsonDatasource constructor
 * @param pConfig	the connection configuration
 */
var JsonDatasource=function(pConfig) {
	this.parent=Datasource;
	this.parent();
	this.config=pConfig || {};
};
JsonDatasource.prototype=new Datasource;

/**
 * Initializes the datasource
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
JsonDatasource.prototype.init=function(pParams, pCallback) {
	console.log('JsonDatasource.init()');
	pCallback && pCallback();
};

/**
 * Closes the datasource
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
JsonDatasource.prototype.close=function(pConnection, pCallback) {
	console.log('JsonDatasource.close()');
	pCallback && pCallback();
};

/**
 * Gets the object used by DAOs
 * @param pKey	 		the file name key
 * @returns 			the file name or file names
 */
JsonDatasource.prototype.getDaoParams=function(pKey) {
	return (pKey && this.config[pKey]) ? this.config[pKey] : this.config;
};

module.exports=JsonDatasource;