var ModelTransposer=require('../utils/common/ModelTransposer');

/**
 * Service constructor
 * @param pDatasource	the data source
 */
var Service=function(pDatasource) {
	this.datasource=pDatasource;
};

/**
 * Initialize a service
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
Service.prototype.init=function(pParams, pCallback) {
	if(this.datasource && this.datasource.init) {
		return this.datasource.init(pParams, pCallback);
	}
	pCallback && pCallback();
};

/**
 * Closes a service
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
Service.prototype.close=function(pParams, pCallback) {
	if(this.datasource && this.datasource.init) {
		return this.datasource.close(pParams, pCallback);
	}
	pCallback && pCallback();
};

module.exports=Service;