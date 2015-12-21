/**
 * Datasource.js
 */
var Datasource=function(pParams) {};

/**
 * Initializes the datasource
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
Datasource.prototype.init=function(pParams, pCallback) {
	pCallback && pCallback();
};

/**
 * Closes the datasource
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
Datasource.prototype.close=function(pParams, pCallback) {
	pCallback && pCallback();
};

/**
 * Gets the object used by DAOs
 * @returns the object used by DAOs
 */
Datasource.prototype.getDaoParams=function() {
	return null;
};

module.exports=Datasource;