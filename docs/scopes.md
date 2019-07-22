Scopes
======

```js
const obj = { foo: 'Foo', bar: 'Bar' };
```

```js
const obj = {
  foo: 'Foo',
  bar: 'Bar'
};
```


```fire
const obj = { foo: 'foo', bar: 'bar' }
```

```fire
const obj = {
  foo: 'foo'
  bar: 'bar'
}
```

```fire
const obj =
  foo: 'foo'
  bar: 'bar'

const obj =
  foo: 'foo'
    bar: 'bar' <- indention error
```

* `{` or `{ + [indent]` or `[indent]`
* foo
* :
* 'foo'
* `,` or `[indent]`
* bar
* :
* 'bar'
* `}` or `[outdent] + }` or `[outdent]`

walkScope(`}`)
  * break on `}`
  * split on `,` or `[indent]` or `, + [indent]`
  * on outdent throw indention error

walkScope() <- first item sets scope indention
  * break on outdent
  * split on `,` or `[indent]` or `, + [indent]`
  * on indent throw indention error
  * higher indention throw indention error

---

### Call expression

```js
foo('one', two)
```

```js
foo(
  'one',
  two
)

foo(
'one',
two
)

foo(
    'one',
    two
)
```

```fire
foo('one', two)
```

```fire
foo(
  'one'
  two
)

foo(
'one'
two
)

foo(
    'one'
    two
)

foo(
  'one'
    two <- indention error or
)
```

```fire
do foo
  'one'
  two


do foo
'one' <- syntax error
two


do foo
    'one'
    two
```

* foo
* `(` or `( + [indent]`
* `one`
* `,` or `[indent]` or `, + [indent]`
* two
* `)` or `[outdent]`

walkScope(')')
 * break on ')'
 * on outdent throw indention error
 * split on `,` or `[indent]` or `, + [indent]`

 walkScope('') <- first item sets scope indention
  * break on ')'
  * on outdent throw indention error
  * split on `,` or `[indent]` or `, + [indent]`
  * higher indention throw indention error
