Item
====

Description

Syntax
------

```
const num = 1
const str = '1'

num eql str // false
num == str // throw TypeError('Can not compare number and string')

--

if num == str // false
is num == str // throw TypeError('Can not compare number and string')

if num is num
```

```
is [expression]
  [body]
else
  [alternate body]
```

#### Firescript

```fire
const num left = 1
const str right = '1'

left == right // throw TypeError('Can not compare number and string')
```

#### Javascript

```js

```
