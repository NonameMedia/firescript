Function declaration
====================

Description

Syntax
------

### Function declaration

```fire
func foo (num)
  num += 1
  return num
```

#### Output

```js
function foo (num) {
  num += 1
  return num
}
```

### Function expression

```fire
const foo = (num) =>
  num += 1
  return num
```

#### Output

```js
function foo (num) {
  num += 1
  return num
}
```

Allowed childs
--------------

```
BlockStatement
```

Esprima interfaces
------------------

```ts
interface FunctionExpression {
    type: 'FunctionExpression';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    expression: boolean;
}


type FunctionParameter = AssignmentPattern | Identifier | BindingPattern;
```

```ts
The value of generator is true for a generator expression.
Arrow Function Expression

interface FunctionExpression {
    type: 'ArrowFunctionExpression';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement | Expression;
    generator: boolean;
    async: boolean;
    expression: false;
}
```

```ts
interface FunctionDeclaration {
    type: 'FunctionDeclaration';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    expression: false;
}

type FunctionParameter = AssignmentPattern | Identifier | BindingPattern;

```

---

## Drafts

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
