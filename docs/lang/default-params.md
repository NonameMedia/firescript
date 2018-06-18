Default parameters
==================

Default parameters allowing initializing parameters with default values if they're `undefined`.

(i) This feature has to be enabled by setting `esDefaultParams` to `true`.


Syntax
------

```
func ([param] = [defaultValue])
  [body]
```

#### FireScript

```fire
func greet(msg = 'Hello World')
  return msg
```

#### Javascript

```js
function greet(msg = 'Hello World') {
  return msg;
}
```

#### Javascript (transformed)

```js
function greet(msg) {
  msg = msg || 'Hello World';
  return msg;
}
```
