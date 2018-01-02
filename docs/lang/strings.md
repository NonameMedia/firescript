Strings
=======

Strings in FireScript are wrapped with `'`.
There are no other supported quotes like `"` or `\`` like in Javascript. Firescript supports inline variables in the same way Javascript does.

```fs
const name = 'Andi'
const str = 'Hello ${name}!'
// => Hello Andi!
```

String concatenated
-------------------

Strings can be concatenated by using the `+` char.

```fs
const str1 = 'Hello '
const str2 = 'World'
const greeting = str1 + str2
```
