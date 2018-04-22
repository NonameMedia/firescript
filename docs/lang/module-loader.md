Module loader
=============

### Named imports/exports

##### FireScript

```fire
import banana, coconut as c1 from 'banana'

export banana
export c1 as coconut
```

##### ESM

```js
import { banana, coconut as c1 } from 'banana'

export { banana }
export { c1 as coconut }
```

##### CommonJS

```js
const banana = require('banana').banana
const c1 = require('banana').coconut

module.exports.banana = banana
module.exports.coconut = c1
```

### Default imports/exports

##### FireScript

```fire
import ** as banana from 'banana'

export ** banana
```

##### ESM

```js
import banana from 'banana'

export default banana
```

##### CommonJS

```js
const banana = require('banana')

module.exports = banana
```

### Module export

##### FireScript

```fire
export * from 'banana'
```

### Import all

##### FireScript

```fire
import * as banana from 'banana'
```


### Object export

##### FS

```fire
export class Banana
  # body

export const COLOR = 'yellow'
```

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
