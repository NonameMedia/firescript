Comments
========

Comments are code which being prevented from transpiling and has no effect on the code.
Comments aren't transpiled into Javascript per default.
Enable comments in output by setting transpiler feature `comments` to `true`

Syntax
------

The `#` char is used for line comments and `/* ... */` indicates a block comment.

```
#[comment]EOL

/*[comment]*/
```

Examples
--------

```
# I'm a line comment
console.log('Hello World!')
```

```
/*
 I'm a block comment
*/
func print (msg)
  console.log(msg)
```

#### Firescript

```fire
# Line comment

/*
 Block comment
*/
```

#### Javascript

```js
// Line comment

/*
 Block comment
*/
```
