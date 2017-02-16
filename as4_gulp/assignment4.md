# gulp-markdown-pdf


## Install

```
$ npm install --save-dev gulp-markdown-pdf
```


## Usage

```js
var gulp = require('gulp');
var markdownpdf = require('gulp-markdown-pdf');

gulp.task('default', function () {
	return gulp.src('intro.md')
		.pipe(markdownpdf())
		.pipe(gulp.dest('dist'));
});
```


| Num      | Subject       |
| :-------:| :-------------:|
| 1   | Sass. |
| 2   | @media. |
| 3   | Gulp. |
| 4   | Gulp cont'd |
