/**
 * ProductServerService.js
 */
var Async=require('async');
var ProductService=require('./ProductService');
var ProductDao=require('../../server/dao/DaoProvider').ProductDao;
var ProductModel=require('../../models/product/ProductModel');
var ProductTextContent=require('../../models/product/ProductModel');
var ProductExpertise=require('../../models/product/ProductModel');
var ProductCharacteristic=require('../../models/product/ProductModel');
var Utils=require('../../utils/common/Utils');


/**
 * ProductServerService constructor
 * @param pDataSource	the datasource
 */
var ProductServerService=function(pDataSource) {
	this.parent=ProductService;
	this.parent(pDataSource);
	// daos
	this.productDao=null;
	if(this.datasource && this.datasource.getDaoParams) {
		this.productDao=new ProductDao(this.datasource.getDaoParams());
	} else {
		console.log('Daos could not be created: ',pDataSource);
	}
};
ProductServerService.prototype=new ProductService();


//=============================================================================================================//
//		SERVICE API METHODS
//=============================================================================================================//

/**
 * Gets the view model
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
ProductService.prototype.getViewModel=function(pParams, pCallback) {
	console.log('ProductService.getViewModel()',pParams);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		var self=this;
		var model=new ProductModel();
		Async.waterfall(
			[
			 	function(wCallback) {
			 		// get text content
					self.productDao.getTextContentByLocale(pParams.locale, wCallback);
				},
			 	function(textContent, wCallback) {
					model.setTextContent(textContent);
			 		// get expertise
			 		self.productDao.getExpertiseByLocale(pParams.locale, wCallback);
			 	},
			 	function(expertise, wCallback) {
					model.setExpertise(expertise);
			 		// get characteristics
			 		self.productDao.getCharacteristicsByLocale(pParams.locale, wCallback);
			 	},
			 	function(characteristics, wCallback) {
					model.setCharacteristics(characteristics);
			 		wCallback(null);
			 	}
			],
			function(error) {
				console.log('Result',model);
				pCallback && pCallback(error, model);
			}
		);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Save view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
ProductServerService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('ProductServerService.saveViewModel()', pParams, pTextContent);
	try {
//		if(! pViewModel instanceof ProductModel) throw new Error('Invalid ViewModel');
		if(pViewModel==undefined) throw new Error('Missing View Model');
		var self=this, response={};
		var queue=[
			function(sCallback) {
				self.saveTextContent(pParams, pViewModel.textContent, function(err, result) {
					response.textContent=err || true;
					sCallback(null);
				});
			},
			function(sCallback) {
				self.saveExpertise(pParams, pViewModel.expertise, function(err, result) {
					response.expertise=err || true;
					sCallback(null);
				});
			},
			function(sCallback) {
				self.saveCharacteristics(pParams, pViewModel.characteristics, function(err, result) {
					response.characteristics=err || true;
					sCallback(null);
				});
			}
		];
		Async.series(queue, function(err) {
			pCallback && pCallback(err, response);
		});
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Save text content
 * @param pParams		the request parameters
 * @param pTextContent	the text content
 * @param pCallback		the callback to invoke on completion
 */
ProductServerService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	//console.log('ProductServerService.saveTextContent()', pParams, pTextContent);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		if(pTextContent==undefined) throw new Error('Missing Text Content');
		this.productDao.saveTextContent(pParams.locale, new ProductTextContent(pTextContent), pCallback);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Save an expertise or an expertise list
 * @param pParams		the request parameters
 * @param pExpertise	the product expertise
 * @param pCallback		the callback to invoke on completion
 */
ProductServerService.prototype.saveExpertise=function(pParams, pExpertise, pCallback) {
	//console.log('ProductServerService.saveExpertise()', pParams, pTextContent);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		if(pExpertise==undefined) throw new Error('Missing Product Expertise');
		var items=Utils.isArray(pExpertise) ? pExpertise : [pExpertise];
		var self=this, response=[];
		Async.eachSeries(items, function(expertise, eCallback) {
			self.productDao.saveExpertise(pParams.locale, new ProductExpertise(expertise), function(err, result) {
				response=err || true;
				eCallback(null);
			});
		}, function(err) {
			pCallback && pCallback(err, response);
		});
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Save a characteristic or a list of characteristics
 * @param pParams			the request parameters
 * @param pCharacteristics	the product characteristics
 * @param pCallback			the callback to invoke on completion
 */
ProductServerService.prototype.saveCharacteristics=function(pParams, pCharacteristics, pCallback) {
	//console.log('ProductServerService.saveTextContent()', pParams, pTextContent);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		if(pCharacteristics==undefined) throw new Error('Missing Product Characteristics');
		var items=Utils.isArray(pExpertise) ? pExpertise : [pExpertise];
		var self=this, response=[];
		Async.eachSeries(items, function(characteristic, eCallback) {
			self.productDao.saveCharacteristic(pParams.locale, new ProductCharacteristic(characteristic), function(err, result) {
				response=err || true;
				eCallback(null);
			});
		}, function(err) {
			pCallback && pCallback(err, response);
		});
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

module.exports=ProductServerService;