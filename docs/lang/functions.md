Function declaration
====================

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
