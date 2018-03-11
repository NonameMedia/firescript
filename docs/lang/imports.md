import
======

The import statement imports functions and objects from an external script or module

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

#### FireScript

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
