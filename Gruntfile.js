module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		watch : {
			react : {
				files : ['react/*.jsx', 'react/*.js', 'react/**/*.jsx', 'react/**/*.js', 'server/**', 'services/**', 'models/**'],
				tasks : [ 'browserify' ]
			}
		},

		browserify : {
			bundleOptions : {
				debug : true
			},
			client : {
				src : ['react/Bootstrap.jsx','models/**/*.js','node_modules/moment/locale/de.js'],
				dest : 'public/js/bundle.js',
				options: {
					exclude: ['server/**/*','routes/**/*']
				}
			}
		},
	    uglify: {
	    	options: {
	        	banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */ '
	        },
	        build: {
	        	src: 'public/js/bundle.js',
	        	dest: 'public/js/bundle.js'
	        }
	    },
		nodemon : {
			dev : {
				script : './bin/www',
				options : {
					ext : 'js',
					watch : [ 'server/**'],
		            ignore: ['node_modules/**','react/**','public/**']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', [ 'browserify' ]);
	grunt.registerTask('deploy', [ 'browserify', 'uglify' ]);
};