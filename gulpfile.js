//Need to ensure namespace is added first into the list everything else can be whenever! 'use strict';
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var assign = require('lodash.assign');

var customOpts = {
	entries: './js/src/main.js',
	debug: true, 
}
var opts = assign({}, watchify.args, customOpts);

gulp.task('default', function () {
	// set up the browserify instance on a task basis
	var b = watchify(browserify(customOpts));


	var bundle = function(){
		return b.bundle()
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
				// Add transformation tasks to the pipeline here.
				.pipe(uglify())
				.on('error', gutil.log)
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./js/'));  	
	}

	b.on('log', gutil.log);
	b.on('update', bundle); // on any dep update, runs the bundler
	

	return bundle();

});
