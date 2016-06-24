const gulp = require('gulp');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const del = require('del');
const run = require('run-sequence');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rollup = require('rollup').rollup;
const rename = require('gulp-rename');

const tsDev = ts.createProject('tsconfig.json');

const tsProd = ts.createProject('tsconfig.json',
  {
    "target": "es6",
    "module": "es6",
  });

// Default task
gulp.task('default', ['build'], function() {
  return gulp.watch('src/**/**.ts', ['build']);
});

// Dev tasks
gulp.task('build', function(callback) {
  return run('tsDev', 'test', callback);
})

gulp.task('tsDev', ['clean-build'], function () {
  return tsDev.src()
    .pipe(ts(tsDev))
    .pipe(gulp.dest('build'));
});

gulp.task('test', function () {
  return gulp.src('build/**/*.spec.js')
  .pipe(mocha({
    // reporter: 'nyan'
    reporter: 'spec'
  }));
});

// Clean tasks
gulp.task('clean', ['clean-build', 'clean-dist']);

gulp.task('clean-build', function () {
  return del('build/**/**');
});

gulp.task('clean-dist', function() {
  return del('dist/**/**');
})

// Production tasks
gulp.task('package', function() {
  return run('tsProd', 'rollup', 'babel', 'compress');
})

gulp.task('tsProd', ['clean-build'], function() {
  return tsProd.src()
    .pipe(ts(tsProd))
    .pipe(gulp.dest('build'));
});

gulp.task('babel', function() {
  return gulp.src('dist/mobx-microstates.js')
    .pipe(
      babel({
        presets: ['es2015'],
      })
    )
    .pipe(gulp.dest('dist'))
})

gulp.task('rollup', function() {
  return rollup({
    entry: 'build/lib/main.js',
  }).then(function(bundle) {
    return bundle.write({
      format: 'cjs',
      dest: 'dist/mobx-microstates.js'
    });
  });
});

gulp.task('compress', function(callback) {
  pump(
    [
      gulp.src('dist/mobx-microstates.js'),
      uglify(),
      // minifier({}, uglify),
      rename({
        basename: 'mobx-microstates.min',
        extName: ".js",
      }),
      gulp.dest('dist'),
    ],
    callback
  );
});
