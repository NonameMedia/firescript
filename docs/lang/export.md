export
======

The `export` statement is used to export objects, functions or values of a module.

Syntax
------

```
export [statement]
```

### Default export

#### FireScript

```fire
export default foo
```

#### Javascript

```js
export default foo
```

### Named exports

```fire
export { name1, name2 }

export
  name1
  name2

export
  name1 as one
  name2 as two
```

#### Output

```js
export { name1, name2 }

export {
  name1,
  name2
}

export {
  name1 as one,
  name2 as two
}
```

Allowed childs
--------------

```

```

Esprima interfaces
------------------

```ts

```

Examples
--------

```fire

```

### Export types

| FireScript            | >= ES7                 | < ES7                                   |     |
| --------------------- | ---------------------- | --------------------------------------- | --- |
| export default banana | export default banana  | module.exports = banana                 |     |
| export banana         | export { banana }      | module.exports.banana = banana          |     |
| export banana as b    | export { banana as b } | module.exports.b = banana               |     |
| export let banana     | export let banana      | module.exports.banana = let banana      |     |
| export class Banana   | export class Banana {} | module.exports.banana = class banana {} |     |


export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var, function
export let name1 = …, name2 = …, …, nameN; // also var, const

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
