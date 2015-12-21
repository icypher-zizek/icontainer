/**
 * MysqlDatasource.js
 */
var mysql=require('mysql');
var Datasource=require('./Datasource');

/**
 * MysqlDatasource constructor
 * @param pConfig	the connection configuration
 */
var MysqlDatasource=function(pConfig) {
	this.parent=Datasource;
	this.parent();
	this.config=null;
//	this.connectionPool=null;
	this.connection=null;
	if(pConfig) {
		this.config=pConfig;
		var self=this;
		this.connection=mysql.createConnection(this.config);
		this.connection && this.connection.on('close', function(err) {
			if(err) {
				console.log('Connection closed unexpectedly => reopening ...');
				self.connection=mysql.createConnection(pConfig);
			}
		});
//		this.connectionPool=mysql.createPool(pConfig);
	}
};
MysqlDatasource.prototype=new Datasource;

/**
 * Initializes the datasource
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
MysqlDatasource.prototype.init=function(pParams, pCallback) {
	console.log('MysqlDatasource.init()');
//	this.connection && this.connection.connect();
	pCallback && pCallback();
//	this.connectionPool.getConnection(pCallback);
};

/**
 * Closes the datasource
 * @param pParams 		the parameters
 * @param pCallback		the callback to invoke on completion
 */
MysqlDatasource.prototype.close=function(pConnection, pCallback) {
	console.log('MysqlDatasource.close()');
//	this.connection && this.connection.end();
	pCallback && pCallback();
//	pConnection && pConnection.release();
//	pCallback && pCallback();
};

/**
 * Gets the object used by DAOs
 * @returns the connection object
 */
MysqlDatasource.prototype.getDaoParams=function() {
	return this.connection;
};

module.exports=MysqlDatasource;