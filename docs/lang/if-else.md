if...else statement
===================

The **if** statement executes a `statement` if `condition` is *truthy*. If the `condition` is *falsy* the optional `alternate` condition gets executed.

Syntax
------

```
if [condition]
  [statement]
else
  [alternate]
```

The **else** block is optional.  

The **elif** keyword adds alternate conditions.

```
if [condition]
  [statement]
elif [condition2]
  [statement]
elif [condition3]
  [statement]
else
  [alternate]
```

### if

#### FireScript

```fire
if foo
  console.log(foo)
```

#### Javascript

```js
if (foo) {
  console.log(foo);
}
```

### if...else

#### FireScript

```fire
if foo
  console.log(foo)
else
  console.log('nothing')
```

#### Javascript

```js
if (foo) {
  console.log(foo);
} else {
  console.log('nothing');
}
```

### if...elif...else

```fire
if foo
  console.log(foo)
elif bar
  console.log(bar)
else
  console.log('nothing')
```

#### Javascript

```js
if (foo) {
  console.log(foo)
} else if (bar) {
  console.log('nothing');
} else {
  console.log('nothing');
}
```
