Class declaration
=================

The `class` keyword creates a new class with a given `name`.
The optional `extends` keyword sets a `superClass`. The new created class gets all methods from `superClass`

Syntax
------

```
class [name] extends [superClass]
  [method] ([args])
    [body]

  [method] ([args])
    [body]


```

### Class declaration

#### FireScript

```fire
class Foo
  constructor ()
    this.value = 'foo'

  bla ()
    return this.value
```

#### Javascript

```js
class Foo {
  constructor () {
    this.value = 'foo';
  }

  bla () {
    return this.value;
  }
}
```
