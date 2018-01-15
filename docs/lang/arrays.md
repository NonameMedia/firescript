Arrays
======

Syntax
------

```fire
const arr = [ 'Foo', 'Bar' ]
const arr = [
  'Foo',
  'Bar'
]

const arr =
  'Foo'
  'Bar'
```

Complex arrays
--------------

```fire
const arr =
  'foo'
  'bar'
  []
    'one'
    'two'
  []
    'three'
    'four'
```

Output
------

```js
const arr = [
  'Foo',
  'Bar'
]
```

Allowed childs
--------------

```
Expression | SpreadElement
```

Esprima interfaces
------------------

```ts
interface ArrayExpression {
    type: 'ArrayExpression';
    elements: ArrayExpressionElement[];
}

type ArrayExpressionElement = Expression | SpreadElement;
```
