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

Export statement
================

The `export` statement is used to export module objects, functions or values.

Syntax
------

### export statement

```fire
export foo
```

#### Output

```js
module.exports = foo
```

### export destuctor

```fire
export name1, name2
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
