# About

JavaScript REPL that works on web browsers.

# Demo

http://homma.github.io/app/js-repl/

# Usage Note

- top level let and const does not save a value in the context. use var instead.

- use load(url) function to import external library.

````
> load("https://code.jquery.com/jquery-3.2.1.min.js");
> $("head").children()[0].src
=> https://code.jquery.com/jquery-3.2.1.min.js
````
````
> load("https://unpkg.com/esprima@~4.0/dist/esprima.js");
> var res = esprima.parse("let foo = 'foo'");
> res.body[0].type
=> VariableDeclaration
````

# References

## JS Bin Console
- https://jsbin.com/?console

## jsrepl
- https://github.com/replit/jsrepl
- http://replit.github.io/jsrepl/
- https://github.com/replit/jsrepl/blob/master/util/console.js

## jq-console
- https://github.com/replit/jq-console

## repl.it
- https://github.com/replit/repl.it
- https://repl.it/languages/javascript

