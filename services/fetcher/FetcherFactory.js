/**
 * FetcherFactory.js
 */

var FetcherFactory={};
//var ModelTransposer=require('../../utils/common/ModelTransposer');
var Async=require('async');

/**
 * Creates a fetcher
 * @param pFetcherName	the name of the fetcher
 * @param pServiceMap	the map of avialable services
 */
FetcherFactory.create=function(pFetcherName, pServiceMap) {
	return {
		name: pFetcherName,
		read: function(req, resource, params, config, callback) {
			//params=ModelTransposer.solidify(params);
			var serviceName=params.serviceName, handler=params.handler;
			delete params.serviceName;
			delete params.handler;
			var Service=pServiceMap[serviceName];
			try {
				// validate
				if(Service==undefined) { throw Error(pFetcherName+': Undefined View Type!'); }
				else if(Service[handler]==undefined) { throw Error(pFetcherName+': Undefined Handler '+handler+' or the '+serviceName+' service!'); }
				// handle request
				params.user=req.user;
				Service.init();
				Service[handler].call(Service, params, function(err,data) {
					Service.close();
					callback(err, data/*ModelTransposer.liquefy(data)*/);
				});
			} catch(error) {
				callback(error, null);
			}
		},
		create: function(req, resource, params, body, config, callback){
			//params=ModelTransposer.solidify(params);
			//body=ModelTransposer.solidify(body);
			var serviceName=params.serviceName, handler=params.handler;
			delete params.serviceName;
			delete params.handler;
			var Service=pServiceMap[serviceName];
			try {
				// validate
				if(Service==undefined) { throw Error(pFetcherName+': Undefined View Type!'); }
				else if(Service[handler]==undefined) { throw Error(pFetcherName+': Undefined Handler '+handler+' or the '+serviceName+' service!'); }
				// handle request
				params.user=req.user;
				Service.init();
				Service[handler].call(Service, params, body, function(err,data) {
					Service.close();
					callback(err, data/*ModelTransposer.liquefy(data)*/);
				});
			} catch(error) {
				callback(error, null);
			}
		},
		update: function(req, resource, params, body, config, callback){
			//params=ModelTransposer.solidify(params);
			//body=ModelTransposer.solidify(body);
			var serviceName=params.serviceName, handler=params.handler;
			delete params.serviceName;
			delete params.handler;
			var Service=pServiceMap[serviceName];
			try {
				// validate
				if(Service==undefined) { throw Error(pFetcherName+': Undefined View Type!'); }
				else if(Service[handler]==undefined) { throw Error(pFetcherName+': Undefined Handler '+handler+' or the '+serviceName+' service!'); }
				// handle request
				params.user=req.user;
				Service.init();
				Service[handler].call(Service, params, body, function(err,data) {
					Service.close();
					callback(err, data/*ModelTransposer.liquefy(data)*/);
				});
			} catch(error) {
				callback(error, null);
			}
		},
		delete: function(req, resource, params, config, callback) {
			//params=ModelTransposer.solidify(params);
			console.log(pFetcherName+'.delete');
			var serviceName=params.serviceName, handler=params.handler;
			delete params.serviceName;
			delete params.handler;
			var Service=pServiceMap[serviceName];
			try {
				// validate
				if(Service==undefined) { throw Error(pFetcherName+': Undefined View Type!'); }
				else if(Service[handler]==undefined) { throw Error(pFetcherName+': Undefined Handler '+handler+' or the '+serviceName+' service!'); }
				// handle request
				params.user=req.user;
				Service.init();
				Service[handler].call(Service, params, function(err,data) {
					Service.close();
					callback(err, data/*ModelTransposer.liquefy(data)*/);
				});
			} catch(error) {
				callback(error, null);
			}
		}
	};
};

module.exports=FetcherFactory;