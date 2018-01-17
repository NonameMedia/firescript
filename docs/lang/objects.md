Objects
=======

The ObjectExpression declares objects as variable values or as function arguments.

Syntax
------

```fire
const obj = { foo: 'Foo', bar: 'Bar' }
const obj = {
  foo: 'Foo',
  bar: 'Bar'
}
```

An object expression syntax without any braces and commas is also supported.
Each property has to be placed in its own line, a leading comma is not allowed.
An indention lower or equal of the declaratior signals the ending of an object block.
Empty lines between properties possible, but not recommented.

```fire
const obj =
  foo: 'Foo'
  bar: 'Bar'
```

Complex objects
---------------

```fire
const obj =
  foo:
    bar: 'Bar'
    bla:
      'bli'
      'bla'
      'blu'
      blobber:
        'blubber'
      blobber:
        true
```

Output
------

A Javascript representation would be

```js
const obj = {
  foo: 'Foo',
  bar: 'Bar'
}
```

Allowed childs
--------------

The list shows all allowed childs of an ObjectExpression.

```
Literal | AssignmentPattern | Identifier | BindingPattern | FunctionExpression | null
```

Esprima interfaces
------------------

### Object Expression

```ts
interface ObjectExpression {
    type: 'ObjectExpression';
    properties: Property[];
}

```

where

```ts
interface Property {
    type: 'Property';
    key: Identifier | Literal;
    computed: boolean;
    value: AssignmentPattern | Identifier | BindingPattern | FunctionExpression | null;
    kind: 'get' | 'set' | 'init';
    method: false;
    shorthand: boolean;
}
```
