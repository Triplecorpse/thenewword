var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var copy = require('gulp-copy');
var batch = require('gulp-batch');

var paths = {
    scripts: ['./bower_components/jquery/dist/jquery.min.js', './bower_components/angular/angular.min.js', './bower_components/bootstrap/dist/js/bootstrap.min.js', './src/config.js', './src/main.js', './src/blocks/**/*.js', './src/services/**/*.js'],
    styles: ['./bower_components/bootstrap/dist/css/bootstrap.css', './src/blocks/**/*.scss'],
    fonts: ['./bower_components/bootstrap/dist/fonts/**/*.*'],
    htmls: ['./src/index.html', './src/**/*.html'],
    jsxs: ['./src/**/*.jsx']
};

gulp.task('scripts:concat', () => {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            plugins: ['transform-react-jsx'],
            presets: ['es2015']
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('styles:concat', () => {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('styles:compile', () => {
    return gulp.src('./styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('build', () => {
    runSequence(['scripts:concat', 'styles:concat', 'styles:compile', 'copy:fonts', 'copy:html']);
});

gulp.task('watch', () => {
    return gulp.watch('src/**', ['build']);
});

gulp.task('copy:fonts', () => {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('copy:html', () => {
    return gulp.src(paths.htmls)
        .pipe(gulp.dest('./dist/'));
});

// gulp.task('copy', () => {
//     runSequence(['copy:fonts', 'copy:html']);
// });

gulp.task('default', () => {
    runSequence(['scripts:concat', 'styles:concat', 'styles:compile', 'copy:fonts', 'copy:html', 'watch'])
});