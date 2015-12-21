/**
 * BlogServerService.js
 */
var Async=require('async');
var BlogService=require('./BlogService');
var BlogDao=require('../../server/dao/DaoProvider').BlogDao;
var BlogModel=require('../../models/blog/BlogModel');
var BlogTextContent=require('../../models/blog/BlogTextContent');
var BlogEntry=require('../../models/blog/BlogEntry');
var Encrypter=require('../../utils/common/Encrypter');

/**
 * BlogServerService constructor
 * @param pDataSource	the datasource
 */
var BlogServerService=function(pDataSource) {
	this.parent=BlogService;
	this.parent(pDataSource);
	this.userDao=null;
	if(this.datasource && this.datasource.getDaoParams) {
		this.blogDao=new BlogDao(this.datasource.getDaoParams());
	} else {
		console.log('Daos could not be created: ',pDataSource);
	}
};
BlogServerService.prototype=new BlogService();

//=============================================================================================================//
//		SERVICE API METHODS
//=============================================================================================================//


/**
 * Gets the view model
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
BlogServerService.prototype.getViewModel=function(pParams, pCallback) {
//	console.log('BlogServerService.getViewModel', pParams);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		var self=this;
		var model=new BlogModel();
		Async.waterfall(
			[
			 	function(wCallback) {
			 		// get text content
					self.blogDao.getTextContentByLocale(pParams.locale, wCallback);
				},
			 	function(textContent, wCallback) {
					model.setTextContent(textContent);
			 		// get blog entry summaries
			 		self.blogDao.getBlogEntrySummariesByLocale(pParams.locale, wCallback);
			 	},
			 	function(blogEntrySummaries, wCallback) {
					model.setEntrySummaries(blogEntrySummaries);
			 		wCallback(null);
			 	}
			],
			function(error) {
				if(pCallback) {pCallback(error, model);}
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
BlogServerService.prototype.saveViewModel=function(pParams, pViewModel, pCallback) {
	//console.log('BlogServerService.saveViewModel()', pParams, pTextContent);
	try {
		//if(! pViewModel instanceof BlogModel) throw new Error('Invalid ViewModel');
		if(pViewModel==undefined) throw new Error('Missing View Model');
		var self=this, response={};
		var queue=[
			function(sCallback) {
				self.saveTextContent(pParams, pViewModel.textContent, function(err, result) {
					response.textContent=err || true;
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
BlogServerService.prototype.saveTextContent=function(pParams, pTextContent, pCallback) {
	//console.log('BlogServerService.saveTextContent()', pParams, pTextContent);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		if(pTextContent==undefined) throw new Error('Missing TextContent');
		this.blogDao.saveTextContent(pParams.locale, new BlogTextContent(pTextContent), pCallback);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Gets the details of a blog entry
 * @param pParams		the request parameters
 * @param pCallback		the callback to invoke on completion
 */
BlogServerService.prototype.getBlogEntryDetails=function(pParams, pCallback) {
	//console.log('BlogServerService.getBlogEntryDetails()', pParams);
	try {
		if(pParams.blogId==undefined) throw new Error('Missing Blog Id');
		var blogId=parseInt(Encrypter.decrypt(pParams.blogId+''));
		this.blogDao.getBlogEntryById(blogId, pCallback);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

/**
 * Save a blog entry
 * @param pParams		the request parameters
 * @param pBlogEntry	the blog entry to save
 * @param pCallback		the callback to invoke on completion
 */
BlogServerService.prototype.saveBlogEntry=function(pParams, pBlogEntry, pCallback) {
	//console.log('BlogServerService.saveBlogEntry()', pParams);
	try {
		if(pParams.locale==undefined) throw new Error('Missing Locale');
		if(pBlogEntry==undefined) throw new Error('Missing Blog Entry');
		this.blogDao.saveBlogEntry(pParams.locale, new BlogEntry(blogEntry), pCallback);
	} catch(error) {
		pCallback && pCallback(error, null);
	}
};

module.exports=BlogServerService;
