# Sass

* CSS Provides presentation for web pages
* It has very little programming capability by design
* Fairly simple to learn
* Sass provides extensions to CSS to make CSS more powerful
* Since it is a superset of CSS it is easy to learn

### Features

* Variables
* Functions (mixins)
* Nesting of rules
* Imports that occurs during processing
* Extend or inherit from other rules
* Operators (Math in your CSS)

### Advantages

* CSS compatible
* Feature rich
* Mature
* Well supported
* Open source
* Sass can also minimizes CSS files

### Disadvantages

* Requires a pre-processor to convert to CSS
* makes the project more complex
* Other developers on the project may need to learn it or may use competing tools
* Can make the final CSS more complex
* longer selectors
* greater specificity than needed

# Install

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

Aunque el nombre del archivo tenga un guión bajo, no es necesario indicarlo en la regla @import. Así por ejemplo, si creas un archivo llamado _colors.scss, entonces no se generará un archivo _colors.css. Sin embargo, podrás utilizarlo en tus hojas de estilos con la regla @import "colors";, que importará el archivo _colors.scss.

Obviamente no puedes tener en un mismo directorio una hoja de estilos normal y una parcial con el mismo nombre. Siguiendo el ejemplo anterior, en el mismo directorio no puedes tener un archivo llamado _colors.scss y otro llamado colors.scss.


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

SassScript soporta los cinco operadores aritméticos básicos: suma +, resta -, multiplicación *, división / y módulo %. El operador módulo calcula el resto de la división sin decimales (ejemplo: 5 módulo 2 = 1, % % 2 = 1). Además, si realizas operaciones sobre números con diferentes unidades, Sass convertirá automáticamente las unidades siempre que sea posible:

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


>
> ##### Reference
>
> [Sass - Libros Web](http://librosweb.es/libro/sass/capitulo_6.html)
>
>

