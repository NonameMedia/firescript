Arrays
======

The ArrayExpression declares an array. An array is a list of `values`.



Syntax
------

##### Multiline syntax
```
const arr = [
  [value]
  [value]
  [value]
]
```

##### Inline syntax

```
const arr = [ [value], [value], [value] ]
```

## Multiline syntax

The array expression is similar to Javascript. A xxx brace wraps a list of values.
Each `value` has to be in one line. Leading commas are not allowed.  
~~An indention lower or equal to the declaratior signals the ending of an object block.~~
Empty lines between values possible, but not recommented.

### Firescript

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
