Objects
=======

The ObjectExpression declares objects as variable values or function arguments. An object is a list of key/value pairs.

Syntax
------

##### Multiline syntax

```
const obj =
  [key]: [value]
  [key]: [value]
  [key]: [value]
```

```
foo({
  [key]: [value]
  [key]: [value]
  [key]: [value]
})
```

##### Inline syntax

```
const obj = { [key]: [value], [key]: [value], [key]: [value] }
```


### Multiline syntax

The object expression is similar to Javascript. A curly brace wraps a list of key/value pairs. Each pair has to be in one line. A leading comma is not allowed. The curly braces are optional in variable declarations. An indention lower or equal to the declaratior signals the ending of an object block.
Empty lines between properties possible, but not recommented.

#### Firescript

```fire
const foo =
  foo: 'Foo'
  bar: 'Bar'
```

#### Javascript

```js
const foo = {
  foo: 'Foo',
  bar: 'Bar'
};
```

### Inline syntax

#### Firescript

```fire
foo({ foo: 'Foo', bar: 'Bar' })
```

#### Javascript

```js
foo({ foo: 'Foo', bar: 'Bar' });
```

---


Examples
--------

This exmaple shows a complex object structure with different data types

##### Firescript

```fire
const obj =
  foo:
    bar: 'Bar'
    bla: []
      'bli'
      'bla'
      'blu'
      blobber: 'blubber'
    blobber: true
```

##### Javascript

A Javascript representation would be

```js
const obj = {
  foo: {
    bar: 'Bar',
    bla: [
      'bli',
      'bla',
      'blu',
      {
        blobber: 'blubber'
      }
    ],
    {
      blobber: true
    }
  }
}
```
