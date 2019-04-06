Parser
======

```js
const definition = {
  'keyword "const"': {
    name: 'VariableDeclaration'
  }

  'identifier': {
    name: 'Identifier'
  }

  'operator "="' {
    name: 'AssignmentOperator'
  }

  'literal': {
    name: 'Literal'
  }
}

const parser = new Parse({
  indentionSize: 4,
  codeDefinition: definition
})

const source = 'const banana = \'Banana\''

parser.parse(source)
```

### Source

```js
const banana = 'Banana'
```

### Parser setup

```cson
'keyword "const"':
  name: 'VariableDeclaration'

'identifier':
  name: 'Identifier'

'operator "="'
  name: 'AssignmentOperator'

'literal':
  name: 'Literal'
```

`parser.next()` returns the next possible item

`keyword` = type identifier && is defined as keyword

`parser.next()` returns:

```js
{
  type: 'keyword',
  value: 'const',
  col: 1,
  line: 1,
  index: 0,
  length: 5
}
```

```js
const banana = 'Banana'
```

1) Parser detects an identifier with value `const`.
2) `const` is declared as a keyword. It returns a keyword.
3) Keyword `const` should be resolved with `VariableDeclaration`
4) Within the `VariableDeclaration` class, and identifier is required.
5) `VariableDeclaration` asks parser for an identifier by using `parser.getIdentifier()`
6) Parser returns an identifier with the value `banana`
7) `VariableDeclaration` requires an `punctuator` of type `=`
8) Parser returns an punctuator with the value `=`
9) `VariableDeclaration` requires any value from `parser.next()`
10) `VariableDeclaration` accepts value

* Parser throws an `SyntaxError` if value doesn't match the required type.

Parser Methods
--------------

### next()

**Returns next item based on declarations conf**

### getIdentifier([*str* match | *arr[str]* match])

**Returns a identifier**


`match` defines an optional matching value. The value must match, otherwise a `SyntaxError` is thrown.

```js
{
  type: 'identifier',
  value: 'banana',
  col: 1,
  line: 1,
  index: 0,
  length: 6
}
```

(i) Throws a `SyntaxError` if next type is not an `identifier`. It throws an `IndentionError` if next type is an `Indention`

### getKeyword([*str* match])

**Returns a keyword**

```js
{
  type: 'keyword',
  value: 'const',
  col: 1,
  line: 1,
  index: 0,
  length: 5
}
```

`match` See `getIdentifier()`


### getLiteral([*str* match])

**Returns a literal**

```js
{
  type: 'literal|regexp|number|template',
  value: '\'banana\'',
  col: 1,
  line: 1,
  index: 0,
  length: 5
}
```

`match` See `getIdentifier()`


### getPunctuator([*str* match])

**Returns a punctuator**

```js
{
  type: 'punctuator',
  value: '=',
  col: 14,
  line: 1,
  index: 13,
  length: 1
}
```

`match` See `getIdentifier()`


### getOperator([*str* match])

**Returns a operator**

```js
{
  type: 'operator',
  value: '+',
  col: 14,
  line: 1,
  index: 13,
  length: 1
}
```

`match` See `getIdentifier()`

### isIdentifier()

Checks if next item is an `identifier`

### isKeyword()

Checks if next item is a `keyword`

### isLiteral()

Checks if next item is a `literal`

### isPunctuator()

Checks if next item is a `punctuator`

### isOperator()

Checks if next item is an `operator`

### isIndention()

Checks if next item is an `indention`

## Scope features

### isScope()

Checks if current scope is our scope

Returns an `boolean`

### isChildScope([*bool* allowAnySize])

Checks if current scope is a child scope

`allowAnySize` Set this to `true` to allow a child indention more then one.  
Otherwise an `IndentionError` is thrown.

Returns an `boolean`

### isParentScope()

Checks if current scope is parent scope

Returns an `boolean`




### syntaxError([*str* message])

**Throws a SyntaxError**

```js
SyntaxError: Unexpected token at line 4 column 3

1 | if banana
2 |   log 'Banana'
3 | else
4 |   olg 'No Banana'
x |   ^

```
