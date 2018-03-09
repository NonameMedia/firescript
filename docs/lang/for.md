for
===

The `for` statement creates a loop consists of a `condition`. The `body` gets executed as long as the `condition` evaluates to true.

Syntax
------

```
for [initilazion]; [condition]; [final]
  [body]
```

```
for [variable] in [object]
  [body]
```

```
for [variable] of [iterable]
  [body]
```
### FireScript

```fire
for let i = 0; i < l; i++
  console.log(i)

```

#### Output

```js
for (let i = 0; i < l; i++) {
  console.log(i);
}
```
