Import statement
==================

The import statement imports functions and objects from an external script or module

```fs
import identifier from 'source'
import { identifier, identifier2 } from 'source'
```

gets transpiled into

```js
const identifier = require('source');
const __destruct001 = require('source');
const identifier = __destruct001.identifier;
const identifier2 = __destruct001.identifier2;
```
