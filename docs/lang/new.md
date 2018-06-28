NewExpression
=============

The `new` keyword instantiates a class from a given `ClassName` and returns the newly created `instance`. It takes a list of `arguments` the constructor will be called with.
The `()` braces are mandatory in Firescript.

Syntax
------

```
const [instance] = new [ClassName](...[args])
```

#### Firescript

This example creates an instance of `Foo`

```fire
const foo = new Foo()
```

#### Javascript

```js
const foo = new Foo();
```
