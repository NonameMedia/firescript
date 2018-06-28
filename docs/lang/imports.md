import
======

The import statement imports functions and objects from an external script or module

(i) The `import` and `require()` statements in Javascript are different.
Read more at this [blog post](https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c)

Syntax
------

##### Import defaultExport

```
import [defaultExport] from [source]
```

##### Inline syntax

```
import { [export1], [export2] } from [source]
import { [export1] as [alias], [export2] as [alias] } from [source]
```

##### Multiline syntax

```
import
  [export1]
  [export2]
  from [source]

import
  [export1] as [alias]
  [export2] as [alias]
  from [source]
```

### Import default export

#### Firescript

```fire
import banana from 'banana'
```

#### Javascript

```js
import banana from 'banana'
```


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

### Import types

| Firescript                  | Javascript                       |
| --------------------------- | -------------------------------- |
| import ** as foo from 'foo' | import default as foo from 'foo' |
| import * as foo from 'foo'  | import f * as oo from 'foo'      |
| import foo from 'foo'       | import foo from 'foo'            |
| import foo, bar             | import { foo, bar } from 'foo'   |
|                             |                                  |

import ** from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
