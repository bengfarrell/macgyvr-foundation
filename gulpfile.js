var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
    return browserify({
        entries: './src/main.js',
        standalone: 'App',
        cache: {},
        packageCache: {},
        extensions: ['es2015'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});
