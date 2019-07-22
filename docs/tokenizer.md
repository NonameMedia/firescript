Tokenization
============

The Firescript parser converts the input in an array of tokens first and uses it for parsing.
This step is called [lexical analysis](https://en.wikipedia.org/wiki/Lexical_analysi)

### Interface

The Tokenizer interface is as follows:

```js
const tokenizer = new FirescriptTokenizer(options)
const tokenStack = tokenizer.tokenize(input)

// or a shorthand

const tokenStack = Firescript.tokenize(input, options)
```

### Tokens

The Firescript Tokenizer knows these tokens

Token name   | Description
-------------|------------
keyword      | Keywords like **if**, **import**, **await** etc..
identifier   | variables, function and class names
numeric      | All numeric values like: **123** , **-123** , **1.5**
literal      | Strings and other values
punctuator   | Punctator or separator chars like: **[** , **{** , **(** , **.** or **,**
operator     | Chars like: **+** , **+=** , **>>**
indention    | Indention after a linebreak
comment      | Line comments
blockComment | Block comments
shebang      | Hasbang string like **#!/usr/bin/node**

### Example

A simple hello world example demonstrates how the tokenizer works.

```fire
const greeding = 'Hello World'
console.log(greeding)
```

```js
const fs = require('fs')
const helloWorld = fs.readFileSync('./helloWorld.fire')

Firescript.tokenize(helloWorld)
```

The output of `tokenize()` would be

```json
[
  { "type": "keyword", "value": "const" },
  { "type": "identifier", "value": "greeding" },
  { "type": "operator", "value": "=" },
  { "type": "literal", "value": "'Hello World'" },
  { "type": "indention", "value": 0 },
  { "type": "identifier", "value": "console" },
  { "type": "punctuator", "value": "." },
  { "type": "identifier", "value": "log" },
  { "type": "punctuator", "value": "(" },
  { "type": "identifier", "value": "greeding" },
  { "type": "punctuator", "value": ")" },
  { "type": "indention", "value": 0 }
]
```
