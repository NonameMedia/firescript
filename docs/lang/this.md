this
====

The `this` identifier points within a class to the instance or in a function to the function scope.

Syntax
------

```
this
```

#### Firescript

```fire
class Foo
  constructor ()
    this.value = 'Foo'

  getValue ()
    return this.value

```

#### Javascript

```js
class Foo {
  constructor () {
    this.value = 'Foo';
  }

  getValue () {
    return this.value;
  }
}
```
