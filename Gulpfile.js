var version = new Date().getTime();
var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');
var path = require('path');
var wrap = require('gulp-wrap-amd');
var es = require('event-stream');

var assetTag = function () {
  return version;
};

gulp.task('templates', function () {
  console.log('Compiling Client Templates');
  gulp.src('./templates/**/*.jade')
    .pipe(jade({ client: true }))
    .pipe(wrap({
      deps: [ 'runtime' ],
      params: [ 'jade' ],
      exports: [ 'anonymous' ]
    }))
    .pipe(gulp.dest('./public/javascripts/templates'));
});

gulp.task('default', function () {
  gulp.run('templates');

  console.log('Watching...');
  gulp.watch('./client/**/*.jade', function (event) {
    version = new Date().getTime();
    gulp.run('templates');
  });

});
