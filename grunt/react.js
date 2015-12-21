module.exports = {
	jsx: {
		files: [{
			expand: true,
		    src : [ 'client/search/filter/*.js', 'client/AppUtils.js',
		            'client/ViewUtils.js', 'client/View.js',
		            'client/DateUtils.js', 'client/Utils.js',
		            'client/SearchMaskView.js',
		            'client/SearchMaskController.js',
		            'client/SearchResultView.js',
		            'client/SearchResultController.js',
		            'client/ExtendedMapWidget.js', 'react/*.jsx',
		            'react/**/*.jsx' ],
			dest: 'public/js',
			ext: '.js'
		}]
	}
};