continue
========

The **continue** statement stops the iteration of a loop or label and continues with the next iteration of the current loop.

Syntax
------

```
continue [label]
```

#### FireScript

```fire
while num
  num += 1
  if num < 100
    continue
  else
    break
```

#### Javascript

```js
while (num) {
  num += 1;
  if (num < 100) {
    continue;
  } else {
    break;
  }
}
```
