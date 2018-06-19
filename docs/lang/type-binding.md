Type binding
============

Type binding is a mechanism to bind variables and parameters onto a data type. Type binding is a FireScript feature.

Syntax
------

```
const [type] [name] = [value]
```

```
func [name] ([type] [param])
  [body]
```

#### FireScript

```fire
let num counter = 0
```

```fire
func inc (num counter) num
  return counter += 1
```

#### Javascript

```js
const counter = __FirescriptBindType('num', 0)
```

```js
function inc (counter) {
  counter = __FirescriptBindType('num', counter)
  return counter += 1
}
```
