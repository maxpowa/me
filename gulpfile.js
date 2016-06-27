const gulp = require('gulp');
const jade = require('gulp-jade');

const connect = require('gulp-connect');

gulp.task('devserver', () =>
  connect.server({
    fallback: 'dist/index.html',
    livereload: true,
    root: 'dist'
  })
);

gulp.task('jade', () =>
  gulp.src('./src/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
);

const autoprefix = require('gulp-autoprefixer');
const minify_css = require('gulp-clean-css');

gulp.task('styles', () =>
  gulp.src('./src/styles/**/*.css')
    .pipe(autoprefix('last 2 versions'))
    .pipe(minify_css())
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(connect.reload())
);

const uglify = require('gulp-uglify');

gulp.task('js', () =>
  gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload())
);

const imagemin = require('gulp-imagemin');

gulp.task('img', () =>
  gulp.src('./src/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
);

gulp.task('default', ['jade', 'styles', 'js', 'img', 'devserver'], () => {
  // watch for HTML changes
  gulp.watch('./src/**/*.jade', () => gulp.run('jade') )

  // watch for JS changes
  gulp.watch('./src/js/**/*.js', () => gulp.run('js') )

  // watch for CSS changes
  gulp.watch('./src/styles/**/*.css', () => gulp.run('styles') )

  // Watch for image changes
  gulp.watch('./src/img/**/*.*', () => gulp.run('img') )
});
