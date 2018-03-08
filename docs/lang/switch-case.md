swich-case
==========

The **switch** keyword initiates a sitch-case clause. The **switch** statement evaluates an `expression` and executes the **case** clause with the matching `value`. If no `catch` matches, the **default** clause gets evaluated. The **default** clause is optional.

Syntax
------

```
swich [expression]
  case [value1]
    [body]

  case [value1]
    [body]

  default
    [body]
```

#### FireScript

```fire
switch num
  case 'bla':
    return 1

  case 'foo':
    return 2

  default:
    return 0
```

#### Javascript

```js
switch (num) {
  case 'bla':
    return 1;

  case 'foo':
    return 2;

  default:
    return 0;
}
```
