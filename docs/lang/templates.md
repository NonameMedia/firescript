Templates
=========

Template literals are strings with embedded expresisions. An `expression` enclosed by `${` and `}` is getting evaluated and replaced by the returned value.

Syntax
------

```
const tmpl = 'Hello ${[expression]}'
```

##### Tagged template literals

```
[tag] '[template]'
```

### Template

#### FireScript

```fire
`${banana} is a tasty ${kind}`
```

#### Javascript

```js
`${banana} is a tasty ${kind}`;
```

### Tagged template literals

Tagged template literals are a more advanced form of templates. A tag allows to parse a template literal with a function.

```fire
func tmpl (strs, fruit, kind)
  const str1 = fruits === 'apple' ? 'An ' : strs[0]
  return str1 + fruit + strs[1] + kind

tmpl 'A ${banana} is a ${fruit}'
```

#### Javascript

```js
function tmpl (strs, fruit, kind) {
  const str1 = fruits === 'apple' ? 'An ' : strs[0];
  return str1 + fruit + strs[1] + kind;
}

tmpl 'A ${banana} is a ${fruit}'
```
