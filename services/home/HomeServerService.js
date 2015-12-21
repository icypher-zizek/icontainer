/**
 * HomeServerService.js
 */
var Async=require('async');
var HomeService=require('./HomeService');
var HomeDao=require('../../server/dao/DaoProvider').HomeDao;
var HomeModel=require('../../models/home/HomeModel');
var HomeTextContent=require('../../models/home/HomeModel');
var HomeSlider=require('../../models/home/HomeSlider');


/**
 * HomeServerService constructor
 * @param pDataSource	the datasource
 */
var HomeServerService=function(pDataSource) {
	this.parent=HomeService;
	this.parent(pDataSource);
	// daos
	this.homeDao=null;
	if(this.datasource && this.datasource.getDaoParams) {
		this.homeDao=new HomeDao(this.datasource.getDaoParams());
	} else {
		console.log('Daos could not be created: ',pDataSource);
	}
};
HomeServerService.prototype=new HomeService();


//=============================================================================================================//
//		SERVICE API METHODS
//=============================================================================================================//

/**
 * Gets the view model
 * @param pParams		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
HomeService.prototype.getViewModel=function(pParams, pCallback) {
	//console.log('HomeService.getViewModel()',pParams);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		var self=this;
		var model=new HomeModel();
		var queue=[
		 	function(wCallback) {
		 		// get text content
				self.homeDao.getTextContentByLocale(pParams.locale, wCallback);
			},
		 	function(textContent, wCallback) {
				model.setTextContent(textContent);
		 		// get slider
		 		self.homeDao.getSliderData(wCallback);
		 	},
		 	function(slider, wCallback) {
				model.setSlider(slider);
		 		wCallback(null);
		 	}
		];
		Async.waterfall(queue, function(error) {
				pCallback && pCallback(error, model);
			}
		);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Save a view model
 * @param pParams		the request parameters
 * @param pViewModel	the model to save
 * @param pCallback		the callback to invoke on completion
 */
HomeServerService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('HomeServerService.saveViewModel()', pParams, pTextContent);
	try {
		//if(! pViewModel instanceof HomeModel) throw new Error('Invalid ViewModel');
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
				self.saveSliderData(pParams, pViewModel.slider, function(err, result) {
					response.slider=err || true;
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
HomeServerService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	//console.log('HomeServerService.saveTextContent()', pTextContent);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		if(pTextContent==undefined) throw new Error('Missing TextContent');
		this.homeDao.saveTextContent(pParams.locale, new HomeTextContent(pTextContent), pCallback);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Save slider
 * @param pParams		the request parameters
 * @param pSlider		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
HomeServerService.prototype.saveSliderData=function(pParams, pSlider, pCallback) {
	//console.log('HomeClientService.saveSliderData()',pParams,  pSlider);
	try {
		if(pSlider==undefined) throw new Error('Missing Slider');
		this.homeDao.saveSliderData(new HomeSlider(pSlider), pCallback);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

module.exports=HomeServerService;
