const gulp = require('gulp');
const pug = require('gulp-pug');

const connect = require('gulp-connect');

gulp.task('devserver', ['pug', 'js', 'img'], () =>
  connect.server({
    fallback: 'dist/index.html',
    livereload: true,
    root: 'dist'
  })
);

gulp.task('cname', () =>
  gulp.src('./CNAME')
    .pipe(gulp.dest('./dist/'))
);

gulp.task('pug', () =>
  gulp.src('./src/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
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

const ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['cname', 'pug', 'js', 'img'], () =>
  gulp.src('./dist/**/*')
    .pipe(ghPages({
      branch: 'master'
    }))
);

gulp.task('default', ['devserver'], () => {
  // watch for HTML changes
  gulp.watch('./src/**/*.pug', () => gulp.run('pug') )
  gulp.watch('./src/**/*.scss', () => gulp.run('pug') )

  // watch for JS changes
  gulp.watch('./src/js/**/*.js', () => gulp.run('js') )

  // Watch for image changes
  gulp.watch('./src/img/**/*.*', () => gulp.run('img') )
});
