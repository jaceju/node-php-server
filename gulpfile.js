var gulp    = require('gulp');
var mocha   = require('gulp-mocha');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function () {
  'use strict';
  return gulp.src('./lib/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function () {
  'use strict';
  return gulp.src('./tests/index.js')
    .pipe(mocha({bail: true}));
});
