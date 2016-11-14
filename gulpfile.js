const gulp = require('gulp');
const gutil = require('gulp-util');
const cssmin = require('gulp-clean-css');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const live = require('gulp-livereload');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

const wpErr = (err, stats) => {
	if (err) notify.onError('Error: ' + err);
	err = stats.compilation.errors;
	if (err.length) notify.onError('Error: ' + err[0].message);
};


gulp.task('eslint', () => {
	return gulp.src(['src/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});


gulp.task('js', ['eslint'], () => {
	return gulp.src(['src/app.js'])
		.pipe(webpack(require('./webpack.conf.js'), null, wpErr))
		.pipe(gutil.env.prod ? uglify() : gutil.noop())
		.pipe(gulp.dest('assets/'))
		.pipe(live());
});

gulp.task('lib', () => {
	return gulp.src([ 'lib/standalone-framework.js', 'lib/*.js' ])
		.pipe(concat('lib.js'))
		.pipe(gutil.env.prod ? uglify() : gutil.noop())
		.pipe(gulp.dest('assets/'));
});


gulp.task('styl', () => {
	return gulp.src(['src/reset.styl', 'src/app.styl', 'src/**/*.styl'])
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(stylus({ paths: ['src'], 'include css': true }))
		.pipe(gutil.env.prod ? cssmin({ keepSpecialComments: 0 }) : gutil.noop())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('assets'))
		.pipe(live());
});

gulp.task('watch', ['js', 'styl'], () => {
	if (gutil.env.prod) return;
	live.listen();
	gulp.watch('src/**/*.styl', ['styl']);
	gulp.watch('src/**/*.js', ['js']);
	gulp.watch('src/**/*.html', ['js']);
});

gulp.task('default', [
	'lib',
	'js',
	'styl',
	'watch'
]);
