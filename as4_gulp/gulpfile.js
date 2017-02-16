'use strict';

var gulp = require('gulp');

// our plugins

var sass = require('gulp-sass');

var uglify = require('gulp-uglify');

var htmlmin = require('gulp-htmlmin');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('uglify', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// Gulp-htmlmin - Gulp plugin to minify html

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['sass', 'uglify', 'minify']);
