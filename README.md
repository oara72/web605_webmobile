# as3 - Gulp

Assignment 3: Gulp



## Install Gulp Globally

```
sudo npm install gulp-cli -g
```

```
mkdir project
```

cd project

```
npm init
```
dentro del file project hay ahora un package.json

## first install node

```
npm install
```
esto crea un folder llamado node_modules

Once installed, open a command prompt and enter:

```
node -v
```
to reveal the version number.
```
npm -v
```

cd node_modules

mkdir -p src/{html,images,js,scss} build/{html,images,js,css}


## Install Gulp Locally
You can now install Gulp in your project folder using the command:

```
npm install gulp --save-dev
```

## Create a Gulp Configuration File

Create a new gulpfile.js configuration file in the root of your project folder. Add some basic code to get started:

```
// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    build: 'build/'
  }
;
```

## Gulp Uglify

```
npm install --save-dev gulp-uglify
```

## gulp sass

```
npm install gulp-sass --save-dev
```

## minify html

```
npm install gulp-html-minify
```

## watch
```
npm install --save-dev gulp-watch
```

