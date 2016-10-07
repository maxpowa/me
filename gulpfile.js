/*
 * Constants
 */

const SOURCE = './src'
const OUTPUT = './dist';

/*
 * Task definitions
 */

const gulp = require('gulp');

gulp.task('clean', gulp.series(
    clean
));

gulp.task('build:internal', gulp.series(
    gulp.parallel(
        cname,
        pug,
        js,
        img
    ),
    notify
));

gulp.task('build', gulp.series(
    clean,
    'build:internal'
));

gulp.task('serve', gulp.series(
    'build',
    gulp.parallel(
        watch,
        serve
    )
));

gulp.task('deploy', gulp.series(
    'build',
    deploy
));

gulp.task('default', gulp.series(
    'serve'
));

/*
 * Task implementations
 */

function watch() {
    return gulp.watch(SOURCE, gulp.series(
        'build:internal'
    ))
}

function cname() {
    return gulp.src('./CNAME')
        .pipe(gulp.dest(OUTPUT))
}

const del = require('del');

function clean() {
    return del(OUTPUT)
}

const connect = require('gulp-connect');

function serve() {
    return connect.server({
        fallback: OUTPUT + '/index.html',
        livereload: true,
        root: OUTPUT
    });
}

function notify(done) {
    connect.reload();
    return done();
}

const imagemin = require('gulp-imagemin');

function img() {
    return gulp.src(SOURCE + '/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(OUTPUT + '/img'))
}

const uglify = require('gulp-uglify');

function js() {
    return gulp.src(SOURCE + '/js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest(OUTPUT + '/js'))
        .pipe(connect.reload())
}

const pugjs = require('gulp-pug');

function pug() {
    return gulp.src(SOURCE + '/**/*.pug')
        .pipe(pugjs({
            pretty: true
        }))
        .pipe(gulp.dest(OUTPUT))
}

const ghPages = require('gulp-gh-pages');

function deploy() {
    return gulp.src(OUTPUT + '/**/*')
        .pipe(ghPages({
            branch: 'master'
        }))
}
