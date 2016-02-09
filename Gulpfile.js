'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('build-js', ['codestyle', 'test'], function () {
  return gulp.src('client/**/!(*.spec).js')
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('build-lib', ['build-bootstrap'], function () {
  return gulp.src([
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js'
    ])
    .pipe(gulp.dest('dist/lib/'))
  ;
});

gulp.task('build-bootstrap', function () {
  return gulp.src('node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('dist/lib/bootstrap/'))
  ;
});

gulp.task('build-static', function () {
  return gulp.src('client/**/!(*.js)')
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('build-app', ['build-js', 'build-static']);
gulp.task('build', ['build-lib', 'build-app']);
gulp.task('default', ['codestyle', 'test', 'build', 'start']);

gulp.task('start', ['build'], function() {
  gulp.watch('client/**/*', ['codestyle', 'test', 'build-app']);
  return nodemon({
    script: 'index.js',
    ext: 'js',
  });
});

gulp.task('test', function() {
});

gulp.task('codestyle', function() {
  return gulp.src(['client/**/*.js'])
    .pipe(jshint())
    .pipe(jscs())
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});
