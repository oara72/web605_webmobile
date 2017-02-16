'use strict';

var gulp = require('gulp');

// our plugins

var sass = require('gulp-sass');

var uglify = require('gulp-uglify');

var htmlmin = require('gulp-htmlmin');

var markdownpdf = require('gulp-markdown-pdf');

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


// Markdown to pdf

gulp.task('markdown-pdf', function () {
    return gulp.src('assignment4.md')
        .pipe(markdownpdf())
        .pipe(gulp.dest('dist/pdf'));
});

// Default Task
gulp.task('default', ['sass', 'uglify', 'minify', 'markdown-pdf']);
