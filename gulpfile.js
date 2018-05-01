'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');

gulp.task('scripts', (done) => {
  gulp.src('./src/scripts/dropdown.js')
    .pipe($.plumber())
    .pipe(webpack({
      devtool: 'inline-source-map',
      output: {
        filename: 'dropdown.js',
        library: 'Dropdown'
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: [/node_modules/],
            use: [{
              loader: 'babel-loader',
              options: { presets: ['env', 'es2015'] }
            }]
          }
        ]
      },
      plugins: [
        new UglifyJsPlugin({ sourceMap: true }) // { sourceMap: true }
      ]
    }))
    .pipe(gulp.dest('./dist/scripts/'));

  browserSync.reload();
  done();
});

gulp.task('styles', (done) => {
  gulp.src('./src/styles/*.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({ cascade: false }))
    .pipe($.csscomb())
    .pipe(gulp.dest('./dist/styles'))
    .pipe($.cssnano())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/styles'));

  browserSync.reload();
  done();
});

gulp.task('icons', (done) => {
  gulp.src('./src/icons/*.png').pipe(gulp.dest('./dist/icons/'));
  browserSync.reload();
  done();
});

gulp.task('clean', (cb) => {
  return rimraf('./dist', cb);
});

gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'styles', 'icons')));

gulp.task('watch', () => {
  $.watch('src/scripts/**/*.js', gulp.series('scripts'));
  $.watch('src/styles/**/*.less', gulp.series('styles'));
  $.watch('src/icons/**/*.*', gulp.series('icons'));
});

gulp.task('server', () => {
  browserSync.init({
    server: { baseDir: './' },
    cors: true,
    port: 9000
  });

  gulp.watch(['example/**/*.*', '*.html']).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('server', 'watch')));
