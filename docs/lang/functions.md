Function declaration
====================

FireScript knows three types of functions. These are common functions, async functions and generator functions. The **func** keyword defines a common function, **async** defines an async function and the **gen** keyword defines a generator function.

The **return** statement stops the execution of a function and returns a value to the function caller. Return works in `func`, `async` and `gen` functions.

The **await** operator waits for a Promise. It can used within a `async` function.

The **yield** operator pauses and resumes a generator. It works within a `gen` functions.

The **yield*** statement delegates to another generator or iterable object.

Syntax
------

##### Function

```
func [name] (...[args])
  [body]
```

##### Async function

```
async [name] (...[args])
  [body]
```

##### Generator function

```
gen [name] (...[args])
  [body]
```

##### Arrow function

```
=> (...[args])
  [body]
```

##### Async arrow function

```
=> async (...[args])
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

### Arrow functions

Arrow functions are anonymous functions and they don't have their own *this*, *arguments*, *super*, or *new.target* arguments.

#### FireScript

```fire
(num) =>
  num += 1
  return num
```

#### Output

```js
(num) => {
  num += 1;
  return num;
}
```

### Function call

A function call has the same syntax as in Javascript.

#### FireScript

```fire
foo('bar')
```

#### Javascript

```js
foo('bar')
```
### Function arguments

A function supports parameters like Javascript does, including `rest params` and `default values`

```fire
func banana (color = 'yellow')
  return color
```

```fire
func getFruits (banana, coconut, ...fruits)
  return fruits
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
