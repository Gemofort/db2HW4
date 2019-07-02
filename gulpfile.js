const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};

function copyCss() {
  return gulp.src('./src/**/*.css')
    .pipe(gulp.dest('dist/css'));
}

function copyImages() {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('dist/images'));
}

function template() {
  return gulp.src('./src/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

async function build() {
  await style();
  await copyCss();
  await copyImages();
  await template();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    }
  });
  gulp.watch('./src/sass/**/*.sass', style);
  gulp.watch('./src/*.pug', template)
}

exports.style = style;
exports.template = template;
exports.build = build;
exports.watch = watch;
exports.default = build; 