const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const del = require('del');

sass.compiler = require('node-sass');

function server() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 3000,
    notify: false,
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
      }).on('error', sass.logError),
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function jsDev() {
  return gulp
    .src('src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(rollup(
      {
        plugins: [
          commonjs(),
          resolve(),
          babel({ runtimeHelpers: true }),
        ],
      },
      {
        format: 'iife',
      },
    ))
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
      }).on('error', sass.logError),
    )
    .pipe(gulp.dest('dist/css'));
}

function jsProd() {
  return gulp
    .src('src/js/main.js')
    .pipe(rollup(
      {
        plugins: [
          commonjs(),
          resolve(),
          babel({ runtimeHelpers: true }),
          uglify.uglify(),
        ],
      },
      {
        format: 'iife',
      },
    ))
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

const devBuild = gulp.series(
  cleanDist,
  gulp.parallel(htmlDev, cssDev, sassDev, jsDev, assets),
);

const prodBuild = gulp.series(
  cleanDist,
  gulp.parallel(htmlProd, cssProd, sassProd, jsProd, assets),
);

exports.dev = gulp.series(devBuild, server);
exports.watch = gulp.series(devBuild, gulp.parallel(server, watch));
exports.prod = gulp.series(prodBuild, server);
exports.build = prodBuild;
