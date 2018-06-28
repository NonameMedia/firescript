[value] is [type]
=================

Data type detection checks the data type of a variable. It compares `[value]` with `[type]` and evaluates to `true` if the type matches. Otherwise it evaluates to `false`

Syntax
------

```
[value] is [type]
```

#### Firescript

```fire
if foo is str
```

#### Javascript

```js
if (__FS.isTypeof(__FS.TYPE_STR, foo)) {

}
```
