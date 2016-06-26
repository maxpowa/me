var gulp = require('gulp');
var jade = require('gulp-jade');

var connect = require('gulp-connect');

gulp.task('devserver', function() {
  connect.server({
    fallback: 'dist/index.html',
    livereload: true,
    root: 'dist'
  });
});

gulp.task('jade', function() {
  gulp.src('./src/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

var autoprefix = require('gulp-autoprefixer');
var minify_css = require('gulp-minify-css');

gulp.task('styles', function() {
  gulp.src('./src/styles/**/*.css')
    .pipe(autoprefix('last 2 versions'))
    .pipe(minify_css())
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(connect.reload());
});

var uglify = require('gulp-uglify');

gulp.task('js', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

gulp.task('img', function() {
  gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./dist/img/'))
});

gulp.task('default', ['jade', 'styles', 'js', 'img', 'devserver'], function() {
  // watch for HTML changes
  gulp.watch('./src/**/*.jade', function() {
    gulp.run('jade');
  });

  // watch for JS changes
  gulp.watch('./src/js/**/*.js', function() {
    gulp.run('js');
  });

  // watch for CSS changes
  gulp.watch('./src/styles/**/*.css', function() {
    gulp.run('styles');
  });
});
