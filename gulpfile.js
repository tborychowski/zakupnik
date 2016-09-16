const gulp = require('gulp');
const cssmin = require('gulp-minify-css');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const live   = require('gulp-livereload');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const wpErr = (err, stats) => {
	if (err) notify.onError('Error: ' + err);
	err = stats.compilation.errors;
	if (err.length) notify.onError('Error: ' + err[0].message);
};


gulp.task('js', () => {
	return gulp.src(['src/app.js'])
		.pipe(webpack(require('./webpack.conf.js'), null, wpErr))
		.pipe(gulp.dest('assets/'))
		.pipe(live());
});

gulp.task('lib', () => {
	return gulp.src([ 'lib/standalone-framework.js', 'lib/*.js' ])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('assets/'));
});


gulp.task('styl', () => {
	return gulp.src(['src/reset.styl', 'src/app.styl', 'src/**/*.styl'])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(stylus({ paths: ['src'], 'include css': true }))
		.pipe(cssmin({ keepSpecialComments: 0 }))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('watch', ['js', 'styl'], () => {
	live.listen();
	gulp.watch('src/**/*.styl', ['styl']);
	gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', [
	'lib',
	'js',
	'styl',
	'watch'
]);
