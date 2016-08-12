'use strict';

var gulp = require('gulp');

// js variables
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var connect = require('gulp-connect');

// scss variables
var sass = require('gulp-sass');

// postcss variables
var postcss    = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var pixrem = require('gulp-pixrem');
var cssnano = require('gulp-cssnano');

var paths = {
    css: ['public/css/**/*.css'],
    scss: ['public/scss/**/*.scss'],
    html: ['public/']
};

gulp.task('scss', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('css', function () {
    return gulp.src(paths.css)
        .pipe( sourcemaps.init() )
        .pipe(postcss([ autoprefixer({ browsers: ['ie >= 10', 'last 4 versions', '> 1%'] }) ]))
        .pipe(pixrem())
        // .pipe(cssnano())
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('public/css') );
});


gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./public/*.html')
        .pipe(connect.reload());
});

gulp.task('default', function () {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(['./public/*.html'], ['html']);
});

//gulp.task('default', ['connect']);