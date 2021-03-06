Data typing
===========

The `data typing` converts a value into a target datatype.
Means, you can use `template strings` or `expressions` to define a value and convert it then into a final datatype.

| Datatype | Description                                 |
| -------- | -------------------------------------------- |
| `fmt`    | A formate strin literal                      |
| `str`    | String or template literal                   |
| `raw`    | Raw string, without template literal parsing |
| `int`    | An integer                                   |
| `num`    | A number                                     |
| `bool`   | A boolean                                    |
| `arr`    | An array                                     |
| `obj`    | An object                                    |
| `date`   | A date object                                |
| `reg`    | A regular expression                         |
| `bin`    | A binary string ???                          |
| `func`   | A functions                                  |
|          |                                              |


Syntax
------

```
const myStr = str 'Hello string'
const myReg = reg '[A-Za-z]'
```

#### Firescript

```fire

```

#### Javascript

```js

```

### fmt <str> ...<args>|<arr>

```fire
const str = fmt 'Hello %s, I like %s', name, 'bananas'
```
