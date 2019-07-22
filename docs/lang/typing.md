Typing
======

Firescript has dynamic typing support. Dynamic typing checks data types during runtime of a program. Static typing is planned but not implemented yet.

Firescript supports typing on declaring variables and in function arguments. Typing can be a keyword from list below to set a data type or a class name to check for class instances

##### Supported types

| Keyword | Description                             |
| ------- | --------------------------------------- |
| `any`   | Any types are allowed. (Default)        |
| `arr`   | Checks for an array                     |
| `bool`  | CHecks for a boolean                    |
| `func`  | Checks for a function                   |
| `num`   | Checks for a number                     |
| `obj`   | Checks for a object but excludes `null` |
| `reg`   | Checks for a regular expression         |
| `str`   | Checks for a string                     |

Syntax
------

```
const [type] [name] = [value]
```

```
func [name] ([type] [param])
  [body]
```

#### Firescript

```fire
let num counter = 0
```

Type checks for variable declarations. The assigned value has to be of a specific `type`.

```fire
func count (num counter)
  return counter += 1
```

Type checks in function arguments. An arguments data type has to be of type `type`

```fire
func getInstance (Banana banana)
  return banana
```

This would check if `banana` is an instance of `Banana`

#### Javascript

```js
const counter = FirescriptRuntime.typing('num', 0)
```

```js
function count (counter) {
  FirescriptRuntime.typing('num', counter)
  return counter += 1
}
```
