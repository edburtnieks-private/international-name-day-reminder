const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');

sass.compiler = require('node-sass');

function server() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 3000,
  });
}

function htmlDev() {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function cssDev() {
  return gulp.src('src/vendor/css/**/*.css').pipe(gulp.dest('dist/css'));
}

function sassDev() {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function jsDev() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function htmlProd() {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}

function cssProd() {
  return gulp
    .src('src/vendor/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

function sassProd() {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('dist/css'));
}

function jsProd() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

function assets() {
  return gulp
    .src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.stream());
}

function cleanDist() {
  return del(['dist']);
}

function watch() {
  gulp.watch('src/sass/**/*.scss', sassDev);
  gulp.watch('src/js/**/*.js', jsDev);
  gulp.watch('src/assets/**/*', assets);
  gulp.watch('src/*.html', htmlDev);
}

const dev = gulp.series(
  cleanDist,
  gulp.parallel(htmlDev, cssDev, sassDev, jsDev, assets)
);

exports.dev = gulp.series(dev, server);

exports.watch = gulp.series(dev, gulp.parallel(server, watch));

exports.prod = gulp.series(
  cleanDist,
  gulp.parallel(htmlProd, cssProd, sassProd, jsProd),
  server
);
