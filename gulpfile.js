'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	webpack = require('gulp-webpack'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    live   = require('gulp-livereload'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
	wpCfg = require('./gulpfile-webpack.conf.js'),
	wpErr = function (err, stats) {
		if (err) notify.onError('Error: ' + err);
		err = stats.compilation.errors;
		if (err.length) notify.onError('Error: ' + err[0].message);
	};


gulp.task('js', function () {
	return gulp.src(['src/app.js'])
		.pipe(webpack(wpCfg, null, wpErr))
		// .pipe(uglify())
		.pipe(gulp.dest('assets/'))
		.pipe(live());
});


gulp.task('jshint', function () {
	return gulp.src([ 'src/app.js', 'src/**/*.js' ])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(jshint('src/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styl', function () {
	return gulp.src(['src/app.styl', 'src/**/*.styl'])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(stylus({ paths: ['src'], 'include css': true }))
		.pipe(cssmin({ keepSpecialComments: 0 }))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('watch', ['js', 'styl'], function () {
	live.listen();
	gulp.watch('src/**/*.styl', ['styl']);
	gulp.watch(['src/**/*.js'], ['js']);
});

gulp.task('default', [
	'jshint',
	'js',
	'styl',
	'watch'
]);
