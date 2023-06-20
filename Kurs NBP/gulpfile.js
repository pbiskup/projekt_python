const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./main/dev/scss/bundle.scss')
    .pipe(sass())
    .pipe(gulp.dest('./main/assets/css'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server:{
            baseDir: './'
        }
    })

    gulp.watch('./main/dev/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./main/dev/js/**/*.js').on('change',browserSync.reload);
}
exports.style = style;
exports.watch = watch;