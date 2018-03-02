Function declaration
====================

FireScript knows three types of functions. These are common functions, async functions and generator functions. The **func** keyword defines a common function, **async** defines an async function and the **gen** keyword defines a generator function.

Syntax
------

```
func [name] (...[args])
  [body]
```

```
async [name] (...[args])
  [body]
```

```
gen [name] (...[args])
  [body]
```

### Function declaration

#### FireScript

```fire
func foo (num)
  num += 1
  return num
```


#### Javascript

```js
function foo (num) {
  num += 1;
  return num;
}
```

### Function expression

#### FireScript

```fire
const foo = func foo (num)
  num += 1
  return num
```

#### Javascript

```js
function foo (num) {
  num += 1;
  return num;
}
```

### Generator function

#### FireScript

```fire
gen foo (num)
  while (true)
    yield num += 1
    if num > 100
      break

  return num
```

#### Javascript

```js
function * foo (num) {
  while(true) {
    yield num += 1;
    if (num > 100) {
      break;
    }
  }

  return num;
}
```

### Async function

#### FireScript

```fire
async foo (num)
  await num += 1
  return num
```

#### Output

```js
function * foo (num) {
  await num += 1;
  return num;
}
```

---

## Draft

### Syntax

def *name* ([...args]) *returnType*  
&nbsp; *body*  
&nbsp; return  

```fs
def bal () void
  // function body
  return

() => void
  // function body, has no scope
  return

() -> void
  // function body, has a scope
  return
```

```js
function bla () {
  // function body
  return
}

() => {
  // function body
  return
}
```

## Async function

```fs
async bal () void
  // function body
  return
```

```js
async function bla () {
  // body
  return
}
```

## Generator function

```fs
gen bal () void
  // function body
  return
```

```js
function bla * () {
  // body
  return
}
```

## Callback Functions

```fs
bla('arg1', () => void
  // function body
  return
)

call bla 'arg1', () => void
  // fn body
  return

```
