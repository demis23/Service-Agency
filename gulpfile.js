const browserSync = require('browser-sync');
let gulp = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
concat = require('gulp-concat'),
sass = require('gulp-sass'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename');


gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 8 versions'],
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('style', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/normalize.css/normalize.css',
        'node_modules/@rateyo/jquery/lib/iife/jquery.rateyo.css'

    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
});

gulp.task('script', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/@rateyo/jquery/lib/iife/jquery.rateyo.js',
        'node_modules/mixitup/dist/mixitup.js'

    ])

        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});
gulp.task('js_min', function () {
    return gulp.src([
        'app/js/main.js',

    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('default', gulp.parallel('sass', 'watch', 'browser-sync', 'script', 'style', 'js_min'));
