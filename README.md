# About

JavaScript REPL that works on web browsers.

# Demo

http://homma.github.io/app/js-repl/

# Usage Note

## language

Top level let and const does not save a value in the context.  
Use var instead.

## loading libraries

Use load(url) function to import external library.

````
> load("https://code.jquery.com/jquery-3.2.1.min.js");
> $("head").children()[0].src
=> https://code.jquery.com/jquery-3.2.1.min.js
````
````
> load("https://unpkg.com/esprima@~4.0/dist/esprima.js");
> var res = esprima.parse("let foo = 'foo'");
> JSON.stringify(res)
=> {"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"foo"},"init":{"type":"Literal","value":"foo","raw":"'foo'"}}],"kind":"let"}],"sourceType":"script"}
````

## console

The console object has special functions for convenience.

- console.keys apply Object.keys to the argument before output.
````
> console.keys({ "foo": "foo" });
foo
=> undefined
````

- console.props applies Object.getOwnPropertyNames to the argument before output.
````
> console.props("foo");
0,1,2,length
=> undefined
> console.keys("foo");
0,1,2
=> undefined
````

- console.json applies JSON.stringify to the argument before output.
````
> console.json({ "foo": "foo" });
{"foo":"foo"}
=> undefined
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

