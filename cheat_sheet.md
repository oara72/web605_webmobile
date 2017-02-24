# Readme Mid-Term WebMobile

## Sass

### Install

```
$ gem install sass
```
crear mediante comando un archivo scss

```
$ echo "// SCSS Style" >> style.scss
```

Para utilizar Sass en la línea de comandos, simplemente ejecuta el comando sass:
```
$ sass hoja_estilos.scss archivo_generado.css
```
Si lo prefieres, también puedes añadir la opción --watch para decirle a Sass que vuelva a generar el archivo CSS cada vez que se cambie la hoja de estilos original:

```
$ sass --watch hoja_estilos.scss:archivo_generado.css
```
Si dispones de un directorio con muchos archivos Sass, también puedes vigilarlos todos por si se producen cambios en alguno de ellos:

```
$ sass --watch app/sass:public/stylesheets
```


### Variables

La funcionalidad básica de SassScript es el uso de variables para almacenar valores que utilizas una y otra vez en tus hojas de estilos. Para ello, utiliza cualquier palabra como nombre de la variable, añádele el símbolo $ por delante y establece su valor como si fuera una propiedad CSS normal. Si por ejemplo defines una variable de la siguiente manera:

```
$width: 5em;
```

Ahora ya puedes utilizar la variable llamada $width como valor de cualquier propiedad CSS:

```
#main {
  width: $width;
}
```
Una limitación importante de las variables es que sólo están disponibles dentro del contexto donde se han definido. Esto significa que si defines la variable dentro de una regla anidada, sólo estará disponible para esas reglas anidadas. Si quieres poder utilizar una variable como valor de cualquier propiedad de la hoja de estilos, defínela fuera de cualquier selector.

### Nesting

Sass permite anidar las reglas CSS para que las hojas de estilos sean más concisas y fáciles de escribir. A los selectores anidados se les prefija automáticamente todos los selectores de los niveles superiores. Ejemplo:

```
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```
El código Sass anterior se convierte automáticamente en el siguiente código CSS:

```
#main p {
  color: #00ff00;
  width: 97%;
}
#main p .redbox {
    background-color: #ff0000;
    color: #000000;
}
```
Gracias a las reglas anidadas, se evita tener que repetir una y otra vez los mismos selectores y se simplifica enormemente la creación de hojas de estilos complejas. Ejemplo:

```
#main {
  width: 97%;

  p, div {
    font-size: 2em;
    a { font-weight: bold; }
  }

  pre { font-size: 3em; }
}
```
El código Sass anterior se transforma en el siguiente código CSS:

```
#main {
  width: 97%;
}
#main p, #main div {
  font-size: 2em;
}
#main p a, #main div a {
  font-weight: bold;
}
#main pre {
  font-size: 3em;
}
```


### Import

Sass soporta todas las reglas @ (también llamadas "reglas at") definidas por CSS3. Además, Sass incluye varias reglas específicas llamadas directivas.

Sass mejora la regla @import de CSS para poder importar también archivos SCSS y Sass. Todos los archivos importados, independientemente de su tipo, acaban fusionándose antes de generar el archivo CSS final. Además, cualquier variable o mixin definidos en los archivos importados se pueden utilizar en la hoja de estilos principal.

Los archivos importados se buscan automáticamente en el directorio actual y en Rack, Rails y Merb también se buscan en el directorio de Sass. Utiliza la opción de configuración :load_paths para configurar todos los directorios adicionales en los que quieras buscar archivos. También puedes utilizar la opción --load-path del comando sass.

La regla @import espera como argumento el nombre del archivo a importar. Por defecto busca un archivo Sass y lo importar directamente, pero a veces esta regla se deja tal cual al compilar el archivo CSS:


### Partials

Si quieres importar un archivo SCSS o Sass pero no quieres que se compile como archivo CSS, utiliza un guión bajo como primer carácter del nombre del archivo. De esta manera, Sass no generará un archivo CSS para esa hoja de estilos, pero podrás utilizarla importándola dentro de otra hoja de estilos. Este tipo de archivos que no se compilan se denominan "hojas de estilos parciales" o simplemente "parciales" (en inglés, "partials").

Aunque el nombre del archivo tenga un guión bajo, no es necesario indicarlo en la regla @import. Así por ejemplo, si creas un archivo llamado ```_colors.scss```, entonces no se generará un archivo ```_colors.css```. Sin embargo, podrás utilizarlo en tus hojas de estilos con la regla @import "colors";, que importará el archivo ```_colors.scss```.

Obviamente no puedes tener en un mismo directorio una hoja de estilos normal y una parcial con el mismo nombre. Siguiendo el ejemplo anterior, en el mismo directorio no puedes tener un archivo llamado ```_colors.scss``` y otro llamado colors.scss.


### Mixins

Los mixins permiten definir estilos reutilizables en toda la hoja de estilos sin tener que recurrir a clases CSS no semánticas del tipo .float-left. Los mixins también pueden contener reglas CSS y cualquier otro elemento definido por Sass. Los mixins incluso admiten el uso de argumentos, como si fueran funciones, para poder modificar su comportamiento y ofrecer así una mayor flexibilidad.

Los mixins se definen con la directiva @mixin seguida del nombre del mixin (y opcionalmente una lista de argumentos) y seguida por el bloque de contenidos que definen los estilos del mixin. El siguiente ejemplo define un mixin sin argumentos llamado large-text:

```
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```
Además de estilos, los mixins también pueden contener selectores, incluso con referencias al selector padre. Ejemplo:

```
@mixin clearfix {
  display: inline-block;
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  * html & { height: 1px }
}
```

### Extend/Inheritance

En ocasiones, es necesario que una clase CSS contenga todos los estilos aplicados a otra regla CSS, además de sus propios estilos. La solución habitual en estos casos consiste en crear una clase genérica que puedan utilizar los dos elementos. Imagina que quieres aplicar estilos a dos tipos de mensajes de error diferentes, uno normal y otro más grave. El código HTML podría ser algo como:

```
<div class="error seriousError">
  ¡Acabas de ser hackeado!
</div>
Los estilos CSS podrían ser los siguientes:

.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```
El problema de esta solución es que tienes que acordarte que siempre que apliques la clase .seriousError también tienes que aplicar la clase .error. Esto hace que el mantenimiento de las hojas de estilos se complique y el código HTML de las páginas se complique sin una justificación clara.

Gracias a la regla @extend puedes evitar todos estilos problemas. Esta regla le indica a Sass que un determinado selector debería heredar todos los estilos de otro selector. Ejemplo:

```
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
El código Sass anterior se compila de la siguiente manera:

```
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  border-width: 3px;
}
```
Ahora, todos los estilos que definas para el selector .error también se aplican automáticamente al selector .seriousError, al margen de los estilos propios que pueda definir .seriousError. En la práctica esto significa que cuando apliques la clase .seriousError es como si estuvieras aplicando a la vez la clase .error.

Cualquier otra regla que se aplique al selector .error también se aplicará al selector .seriousError. Imagina que defines el siguiente estilo que se aplica simultáneamente a dos clases CSS:

```
.error.intrusion {
  background-image: url("/image/hacked.png");
}
```
Si ahora añades en tus páginas un elemento como ```<div class="seriousError intrusion">```, también se le aplicará el estilo definido por el selector .error.intrusion.


### Maths Operators

SassScript soporta los cinco operadores aritméticos básicos: suma +, resta -, multiplicación ```*```, división / y módulo %. El operador módulo calcula el resto de la división sin decimales (ejemplo: 5 módulo 2 = 1, % % 2 = 1). Además, si realizas operaciones sobre números con diferentes unidades, Sass convertirá automáticamente las unidades siempre que sea posible:

```
p {
  width: 1in + 8pt;
}
```
El código Sass anterior se compila de la siguiente manera:

```
p {
  width: 1.111in;
}
```
Con los números también se pueden utilizar los operadores relacionales (<, >, <=, >=) y los de igualdad (==, !=).


## Using media queries

A media query consists of an optional media type and zero or more expressions that limit the style sheets' scope by using media features, such as width, height, and color. (Consists of a type and expression to limit the stylesheets’ scope.  In other words, the enclosed CSS will only run if the media query is true)

Media queries, added in CSS3, let the presentation of content be tailored to a specific range of output devices without having to change the content itself.

[developer mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

If the browser window is smaller than 500px, the background color will change to lightblue:

```
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
    background-color: lightgreen;
}

@media only screen and (max-width: 500px) {
    body {
        background-color: lightblue;
    }
}
</style>
</head>
<body>

<p>Resize the browser window. When the width of this document is less than 500 pixels, the background-color is "lightblue", otherwise it is "lightgreen".</p>

</body>
</html>
```

When the screen (browser window) gets smaller than 768px, each column should have a width of 100%:
```
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* {
    box-sizing: border-box;
}
.row::after {
    content: "";
    clear: both;
    display: block;
}
[class*="col-"] {
    float: left;
    padding: 15px;
}
html {
    font-family: "Lucida Sans", sans-serif;
}
.header {
    background-color: #9933cc;
    color: #ffffff;
    padding: 15px;
}
.menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.menu li {
    padding: 8px;
    margin-bottom: 7px;
    background-color: #33b5e5;
    color: #ffffff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.menu li:hover {
    background-color: #0099cc;
}
.aside {
    background-color: #33b5e5;
    padding: 15px;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.footer {
    background-color: #0099cc;
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    padding: 15px;
}
/* For desktop: */
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

@media only screen and (max-width: 768px) {
    /* For mobile phones: */
    [class*="col-"] {
        width: 100%;
    }
}
</style>
</head>
<body>

<div class="header">
  <h1>Chania</h1>
</div>

<div class="row">

<div class="col-3 menu">
  <ul>
    <li>The Flight</li>
    <li>The City</li>
    <li>The Island</li>
    <li>The Food</li>
  </ul>
</div>

<div class="col-6">
  <h1>The City</h1>
  <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.</p>
</div>

<div class="col-3 right">
  <div class="aside">
    <h2>What?</h2>
    <p>Chania is a city on the island of Crete.</p>
    <h2>Where?</h2>
    <p>Crete is a Greek island in the Mediterranean Sea.</p>
    <h2>How?</h2>
    <p>You can reach Chania airport from all over Europe.</p>
  </div>
</div>

</div>

<div class="footer">
  <p>Resize the browser window to see how the content respond to the resizing.</p>
</div>

</body>
</html>
```

### CSS3 Media Types

|Value	|Description  |
|-------|-------------|
|all|Used for all media type devices|
|print|Used for printers|
|screen	|Used for computer screens, tablets, smart-phones etc.|
|speech|Used for screenreaders that "reads" the page out loud|

Example

```
<!DOCTYPE html>
<html>
<head>
<style>
body {
    background-color: pink;
}

@media screen and (min-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
</style>
</head>
<body>

<h1>Resize the browser window to see the effect!</h1>
<p>The media query will only apply if the media type is screen and the viewport is 480px wide or wider.</p>

</body>
</html>

```

### Using Media Features

[Site Point](https://www.sitepoint.com/media-queries-look-different-media-features/)


# Gulp

## Install Gulp Globally

This will install the Gulp command line, globally.

```
npm install --global gulp-cli
```

## Install Node and Gulp Locally

> cd projecto

In order to install Node locally, you need a package.json file.
```
npm init
```
This command will walk you through creating a generic package.json. It’s pretty straightforward, and simply press enter if you’re not sure or don’t want to fill something in

Now we’ll run a command to install Node and Gulp.

```
npm install --save-dev gulp
```
this create a node_module file with 159 items.

Once that’s complete, you can list your files:

> ls

```
node_modules   package.json
```

## Install Gulp Plugins

I start with sass, but if add another before gulp-[pluginName]

```
npm install --save-dev gulp-sass gulp-cssnano gulp-sourcemaps gulp-autoprefixer
```
## Set Up Project

The last thing we need to do is set up a file named gulpfile.js, which is a JavaScript file that will define the entire task running process.

Create a gulpfile.js.

and add the next code:

```
'use strict';

var gulp = require('gulp');

// our plugins

var sass = require('gulp-sass');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Default Task
gulp.task('default', ['sass']);

```

Now to test this code, I’m going to create three simple .scss files – main.scss, ```_variables.scss```, and ```_scaffolding.scss```.

### main (main.scss)
```
/* Main SCSS File */

// Base
@import "variables";

// Components
@import "scaffolding";
```

### variable (```_variables.scss```)
```
// Typography

$font-style: normal;
$font-variant: normal;
$font-weight: normal;
$font-color: #222;
$font-size: 1rem;
$line-height: 1.5;
$font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
```

### scaffolding(```_scaffolding.scss```)
```
// Define typography
html {
  font: $font-style $font-variant $font-weight #{$font-size}/#{$line-height} $font-family;
}

// Vertically center anything
.vertical-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```


All you need to do now is type the gulp command at the root of your project directory.
```
gulp
```
if work a *dist* file is created

## Responsive image

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Assignment 3 - Gulp </title>

    <link rel="stylesheet" href="css/style.css" />
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Sansita" rel="stylesheet">

    <!--[if lt IE 9]>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
    <![endif]-->
    <!--<style type="text/css">-->
        <!--.col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-6, .col-md-8 {-->
            <!--background-color: #34495e;-->
            <!--color: white;-->
            <!--line-height: 5em;-->
            <!--border: 1px solid white;-->
            <!--height: 5em;-->
        <!--}-->
    <!--</style>-->


</head>
<body>

<div class="container">
    <div class="row">
        <div class="nav">
            <ul>
                <li><a href="index.html"> home </a></li>
            </ul>
        </div>

        <!-- content -->

        <div class="col-md-8"> <!-- Este hace una columna a la izquierda -->

            <div id="content">



                <p> Traveling It leaves you speechless, <br> then turns you into a storyteller.</p>

                <div class="box"> To travel is to live ! </div>

                <div id="gallery">

                    <div id="image1"></div>
                    <div id="image2"></div>

                </div>


            </div>

        </div>

        <!-- aside -->

        <div class="col-md-4"> <!-- este hace una columna a la derecha -->

            <div id="sidebar" >

                <p>To travel is to take a journey into yourself. <br>Danny Kaye</p>

            </div>
        </div>

    <!-- The device-pixel-ratio Use Case -->
        <div>
          <img srcset="img/machupichu.jpg 1x, img/malasya.jpg 2x, img/iceland.jpg 3x"
          src="machupichu.jpg"
          alt="picture" />
        </div>

        <!-- Using Media Queries -->
        <div>
        <img srcset="img/machupichu.jpg  1024w, img/malasya.jpg 640w, img/iceland.jpg  320w"
        	   sizes="(min-width: 36em) 33.3vw, 100vw"
        	   src="img/machupichu.jpg"
        	   alt="picture" />
        </div>

        <!-- using picture -->
        <div>
        <picture>
            <source srcset="img/machupichu.jpg" media="(min-width: 1024px)">
            <source srcset="img/malasya.jpg" media="(min-width: 640px)">
            <source srcset="img/iceland.jpg" media="(min-width: 320px)">

            <img srcset="img/iceland.jpg" alt="…">
        </picture>
      </div>

 </div>
    <div id="footer"> <!-- This is the footer --></div>
</div>


<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/footer.js"> </script>
<script src="js/picturefill.js"></script>
</body>
</html>

```

# Quices

## Quiz 1

1.	The extension of the output files from the Sass pre-processor is:
> .css

2. Sass extends __________ to provide more features for developers. PHP 
> CSS

3. An example of how to use a variable that has been declared in Sass: 
> body { width: $width; }

4.	One of the simplest and most useful features of Sass is:  
> all of the above

5. In order to reduce the hassle of pre-processing files, Sass will __________ a folder of scss files.
> watch

6. Which of the following pre-processors is similar to Sass? 
> Less

7. What language is Sass written in? 
> Ruby

8.	Since Sass is a superset of the language,  
> it is compatible with all existing browsers 

9.	An example of declaring a variable in Sass is:    
> $width : 800px;

10.	A disadvantage of Sass is that: 
> it requires a pre-processor

## Quiz 2

1.	The CSS px unit represents: 
> approximately 1/100 inch 

2.	We use the viewport meta tag to:           
> tell the browser to use its actual dimensions to render the page

3.	We can detect the display width using the CSS @ rule:          
> @media

4.	In JavaScript we can access media rules using the method:         
> window.matchMedia()
  
5.	When linking a stylesheet, we can limit it with the attribute:           
> media

6.	Which media query will apply if the viewport is 700px wide? 
> (width: 600px) 

7.	In media queries, we can add the keyword __________ to make sure only browsers that understand media features will process the rule.           
> only

8.	CSS3 only defines 4 media types. Which one is not a CSS3 media type?  
> tty

9.	Media queries where introduced in CSS 2.1. They were expanded in CSS3 to include:          
> media features

10.	Which rule will always display on a computer screen that is 1000px wide and has 16 million colours?           
> screen and (min-width: 600px) and (min-color: 8)

## Quiz 3

1.	The purpose of Gulp is to:
> automate running tasks to build projects

2.	Gulp plugins are written in: 
> JavaScript  

3.	The Gulp configuration file is written in:         
> JavaScript

4.	In order to run most plugins, you use the __________ method.         
> pipe

5.	To have Gulp process your files as soon as you save, use the __________ method.           
> watch

6.	To install Gulp, use the command:           
> npm

7.	What command would you use to run a Gulp task called minhtml.        
> gulp minhtml

8.	What command would you use to run a Gulp task called default.          
> gulp

9.	The name of the Gulp configuration file is:           
> gulpfile.js

10.	When installing a Gulp plugin, if it needs other files in order to work (dependancies):       
> they will be installed or updated automatically

## Quiz 4

1.	This attribute allows the <img> element to select different image files: 
> srcset  

2.	The device-pixel-ratio is:         
> the ratio of CSS px and screen pixels

3.	As well as selecting images based on the device-pixel-ratio, the <img> element can also select images based on the:   
> image width in display pixels  

4.	The sizes attribute can use __________ to determine different values.         
> media queries

5.	To extend images beyond what can be done with the <img> element, the __________ element was added in HTML5.          
> <picture>

6.	The term "Art Direction" is used to describe:          
> using very different images for different screen sizes

7.	Format based selection allows the browser to select from a list of:       
> image formats

8.	A polyfil to allow older browsers to use the new image features is:        
> picturefill.js

9.	The <source> element must be contained in a __________ element.          
> ```<picture>```

10.	To do Art Direction in HTML, you use the __________ attribute.           
> media

## Quiz 5

1.	To associate a label with an input field in HTML we use the for attribute on the label and the __________ attribute on the input.         
> id

2.	In order to help users enter dates in a easy and consistant way, HTML5 provides a new input type:           
> all of these

3.	The new HTML5 element keygen is useful for:          
> Nothing, it has been removed from the web standards

4.	Safari on Mac and IOS will display this field with rounded ends.           
> search

5.	This new field in HTL5 is perfect for displaying the result of a JavaScript calculation.      
> output

6.	To allow a user to input a colour choice, use the __________ element with type="color".      
> input

7.	This new field in HTML5 forms allows you to select from a list or type your own input.        
> datalist

8.	This new input type will allow you to step numbers up by any increment you choose.           
> number

9.	A Placeholder is used to:          
> Provide a hint about what the user should enter in the field

10.	In an HTML5 form, we can use the __________ attribute to put the cursor in the first field.  
> autofocus
