Error Handling
==============

The error handling in Firescript is similar to Javascripts Error handling.
The call stack log output is colorized on Node.js site.



Syntax
------

Create new Firescript Error object

```
Error
```

#### Firescript

```fire
const err = new Error()
```

```fire
const err = new FireError()
```

#### Javascript

```js
// added automatically by the parser
const FireError = require('firescript-runtime').FireError

// parser changed the class name
const err = new FireError()
```

See (FireError)[] for more details.
