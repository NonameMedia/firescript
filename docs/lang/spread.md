spread operator
===============

The spread operator allows an `expression` to be expanded in places.
A spread `expression` can be an iterable, like an array, a string or an object.

Syntax
------

```
...[expression]
```

### Function arguments

#### Firescript

```fire
foo(...args)
```

#### Javascript

```js
foo(...args);
```

### Objects

#### Firescript

```fire
const obj =
  ...foo
  bar: 'bla'
```

#### Javascript

```js
const obj = {
  ...foo,
  bar: 'bla'
}
```
