const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const terser  = require("gulp-terser");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const webp = require('gulp-webp');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

gulp.task('css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('src/js/vanila.js')
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/js'));
});

// Задача для оптимизации изображений
gulp.task('images', function() {
  return gulp.src('src/img/*.{jpg,png,jpeg}')
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest('assets/img'));
});


gulp.task('html', async function() {
  gulp.src(['src/html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

// Задача для слежения за изменениями
gulp.task('watch', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('css'));
  gulp.watch('src/js/vanila.js', gulp.series('js'));
  gulp.watch('src/img/*', gulp.series('images'));
  gulp.watch('src/html/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*').on('change', browserSync.reload);
});

// Задача по умолчанию 
gulp.task('default', gulp.series('css', 'js', 'images', 'html', 'watch'));