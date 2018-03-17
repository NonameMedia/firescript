Module loader
=============

### Object export

##### ESM

```js
export class Banana {

}

export const COLOR = 'yellow';
```

##### CJS

```js
module.exports.Banana = class Banana {

}

const COLOR = 'yellow';
module.exports.COLOR = COLOR
```

##### FS

```fire
export class Banana
  # body

export const COLOR = 'yellow'
```

### Default export

##### ESM

```js
export default coconut
```

##### CJS

```js
module.exports = coconut
```

##### FS

```fire
export default coconut
```

### Named exports

##### ESM

```js
export { coconut }
export { banana as mango }
```

##### CJS

```js
module.exports.coconut = coconut
module.exports.mango = banana
```

##### FS

```fire
export
  coconut
  banana as mango
```

### Export module

##### ESM

```js
export * from 'banana'
```

##### CJS

```js
module.exports = require('banana')
```

##### FS

```fire
export * from 'banana'
```
