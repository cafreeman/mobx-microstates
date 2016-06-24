const gulp = require('gulp');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');
const del = require('del');
const run = require('run-sequence');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['all'], function() {
  return gulp.watch('src/**/**.ts', ['all']);
});

gulp.task('all', function(callback) {
  return run('ts', 'test', callback);
})

gulp.task('ts', ['del'], function () {
  return tsProject.src()
    .pipe(ts(tsProject))
    .pipe(gulp.dest('build'))
});

gulp.task('del', function () {
  return del('build/**/**');
});

gulp.task('test', function () {
  return gulp.src('build/**/*.spec.js')
      .pipe(mocha({
          // reporter: 'nyan'
          reporter: 'spec'
      }));
});
