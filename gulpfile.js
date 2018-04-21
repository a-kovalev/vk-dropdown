'use strict'

const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combine = require('stream-combiner2');
const rimraf = require('rimraf');

gulp.task('js', () => {
	let combined = combine.obj([
		gulp.src('./src/*.js'),
		$.babel({ presets: ['env'], plugins: ['transform-object-rest-spread'] }),
		gulp.dest('./dist/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('js:min', () => {
	let combined = combine.obj([
		gulp.src('./src/*.js'),
		$.babel({ presets: ['env'], plugins: ['transform-object-rest-spread'] }),
		$.uglify(),
		$.rename({ suffix: '.min' }),
		gulp.dest('./dist/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('less', () => {
	let combined = combine.obj([
		gulp.src('./src/*.less'),
		$.less(),
		$.autoprefixer({ cascade: false }),
		$.csscomb(),
		gulp.dest('./dist/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('less:min', () => {
	let combined = combine.obj([
		gulp.src('./src/*.less'),
		$.less(),
		$.autoprefixer({ cascade: false }),
		$.csscomb(),
		$.cssnano(),
		$.rename({ suffix: '.min' }),
		gulp.dest('./dist/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('icons', () => {
	let combined = combine.obj([
		gulp.src('./src/*.svg'),
		gulp.dest('./dist/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('clean', (cb) => {
	rimraf('./dist', cb);
});

gulp.task('build', [
	'js',
	'js:min',
	'less',
	'less:min',
	'icons'
]);

gulp.task('watch', () => {
	$.watch(['src/*.js'], () => {
		gulp.start('js');
		gulp.start('js:min');
	});

	$.watch(['src/*.less'], () => {
		gulp.start('less');
		gulp.start('less:min');
	});

	$.watch(['src/*.svg'], () => {
		gulp.start('icons');
	});
});

gulp.task('default', ['build', 'watch']);