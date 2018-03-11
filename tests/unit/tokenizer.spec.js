const inspect = require('inspect.js')
const path = require('path')

const Tokenizer = require('../../src/FireScriptTokenizer')

describe('Tokenizer', () => {
  describe('tokenize()', () => {
    it('tokenize a .fire script', () => {
      const bananaSource = inspect.readFile(path.join(__dirname, '../fixtures/banana.fire'))
      const tokenizer = new Tokenizer()
      const token = tokenizer.tokenize(bananaSource)
      inspect(token).isArray()
      inspect(token).isEql([
        { type: 'keyword', value: 'import' },
        { type: 'identifier', value: 'Fruits' },
        { type: 'identifier', value: 'from' },
        { type: 'literal', value: '\'./Fruits\'' },
        { type: 'indention', value: 0 },
        { type: 'keyword', value: 'class' },
        { type: 'identifier', value: 'Banana' },
        { type: 'keyword', value: 'extends' },
        { type: 'identifier', value: 'Fruits' },
        { type: 'indention', value: 2 },
        { type: 'identifier', value: 'constructor' },
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'opts' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: 4 },
        { type: 'identifier', value: 'this' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'isSweet' },
        { type: 'operator', value: '=' },
        { type: 'identifier', value: 'opts' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'isSweet' },
        { type: 'indention', value: 2 },
        { type: 'identifier', value: 'peel' },
        { type: 'punctuator', value: '(' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: 4 },
        { type: 'identifier', value: 'this' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: '__isPeeled' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: 'true' },
        { type: 'indention', value: 0 },
        { type: 'keyword', value: 'export' },
        { type: 'identifier', value: 'default' },
        { type: 'identifier', value: 'Banana' },
        { type: 'indention', value: 0 }
      ])
    })

    it('tokenize a .fire script, range enabled', () => {
      const bananaSource = inspect.readFile(path.join(__dirname, '../fixtures/banana.fire'))
      const tokenizer = new Tokenizer({
        range: true
      })
      const token = tokenizer.tokenize(bananaSource)
      inspect(token).isArray()
      inspect(token).isEql([
        { type: 'keyword', value: 'import', range: [ 0, 6 ] },
        { type: 'identifier', value: 'Fruits', range: [ 7, 13 ] },
        { type: 'identifier', value: 'from', range: [ 14, 18 ] },
        { type: 'literal', value: '\'./Fruits\'', range: [ 19, 29 ] },
        { type: 'indention', value: 0, range: [ 31, 31 ] },
        { type: 'keyword', value: 'class', range: [ 31, 36 ] },
        { type: 'identifier', value: 'Banana', range: [ 37, 43 ] },
        { type: 'keyword', value: 'extends', range: [ 44, 51 ] },
        { type: 'identifier', value: 'Fruits', range: [ 52, 58 ] },
        { type: 'indention', value: 2, range: [ 59, 61 ] },
        { type: 'identifier', value: 'constructor', range: [ 61, 72 ] },
        { type: 'punctuator', value: '(', range: [ 73, 74 ] },
        { type: 'identifier', value: 'opts', range: [ 74, 78 ] },
        { type: 'punctuator', value: ')', range: [ 78, 79 ] },
        { type: 'indention', value: 4, range: [ 80, 84 ] },
        { type: 'identifier', value: 'this', range: [ 84, 88 ] },
        { type: 'punctuator', value: '.', range: [ 88, 89 ] },
        { type: 'identifier', value: 'isSweet', range: [ 89, 96 ] },
        { type: 'operator', value: '=', range: [ 97, 98 ] },
        { type: 'identifier', value: 'opts', range: [ 99, 103 ] },
        { type: 'punctuator', value: '.', range: [ 103, 104 ] },
        { type: 'identifier', value: 'isSweet', range: [ 104, 111 ] },
        { type: 'indention', value: 2, range: [ 113, 115 ] },
        { type: 'identifier', value: 'peel', range: [ 115, 119 ] },
        { type: 'punctuator', value: '(', range: [ 120, 121 ] },
        { type: 'punctuator', value: ')', range: [ 121, 122 ] },
        { type: 'indention', value: 4, range: [ 123, 127 ] },
        { type: 'identifier', value: 'this', range: [ 127, 131 ] },
        { type: 'punctuator', value: '.', range: [ 131, 132 ] },
        { type: 'identifier', value: '__isPeeled', range: [ 132, 142 ] },
        { type: 'operator', value: '=', range: [ 143, 144 ] },
        { type: 'literal', value: 'true', range: [ 145, 149 ] },
        { type: 'indention', value: 0, range: [ 151, 151 ] },
        { type: 'keyword', value: 'export', range: [ 151, 157 ] },
        { type: 'identifier', value: 'default', range: [ 158, 165 ] },
        { type: 'identifier', value: 'Banana', range: [ 166, 172 ] },
        { type: 'indention', value: 0, range: [ 173, 173 ] }
      ])
    })

    it('tokenize a .fire script, location enabled', () => {
      const bananaSource = inspect.readFile(path.join(__dirname, '../fixtures/banana.fire'))
      const tokenizer = new Tokenizer({
        loc: true
      })
      const token = tokenizer.tokenize(bananaSource)
      inspect(token).isArray()
      inspect(token).isEql([
        { type: 'keyword', value: 'import', loc: { start: [ 1, 0 ], end: [ 1, 6 ] } },
        { type: 'identifier', value: 'Fruits', loc: { start: [ 1, 7 ], end: [ 1, 13 ] } },
        { type: 'identifier', value: 'from', loc: { start: [ 1, 14 ], end: [ 1, 18 ] } },
        { type: 'literal', value: '\'./Fruits\'', loc: { start: [ 1, 19 ], end: [ 1, 29 ] } },
        { type: 'indention', value: 0, loc: { start: [ 3, 0 ], end: [ 3, 0 ] } },
        { type: 'keyword', value: 'class', loc: { start: [ 3, 0 ], end: [ 3, 5 ] } },
        { type: 'identifier', value: 'Banana', loc: { start: [ 3, 6 ], end: [ 3, 12 ] } },
        { type: 'keyword', value: 'extends', loc: { start: [ 3, 13 ], end: [ 3, 20 ] } },
        { type: 'identifier', value: 'Fruits', loc: { start: [ 3, 21 ], end: [ 3, 27 ] } },
        { type: 'indention', value: 2, loc: { start: [ 4, 0 ], end: [ 4, 2 ] } },
        { type: 'identifier', value: 'constructor', loc: { start: [ 4, 2 ], end: [ 4, 13 ] } },
        { type: 'punctuator', value: '(', loc: { start: [ 4, 14 ], end: [ 4, 15 ] } },
        { type: 'identifier', value: 'opts', loc: { start: [ 4, 15 ], end: [ 4, 19 ] } },
        { type: 'punctuator', value: ')', loc: { start: [ 4, 19 ], end: [ 4, 20 ] } },
        { type: 'indention', value: 4, loc: { start: [ 5, 0 ], end: [ 5, 4 ] } },
        { type: 'identifier', value: 'this', loc: { start: [ 5, 4 ], end: [ 5, 8 ] } },
        { type: 'punctuator', value: '.', loc: { start: [ 5, 8 ], end: [ 5, 9 ] } },
        { type: 'identifier', value: 'isSweet', loc: { start: [ 5, 9 ], end: [ 5, 16 ] } },
        { type: 'operator', value: '=', loc: { start: [ 5, 17 ], end: [ 5, 18 ] } },
        { type: 'identifier', value: 'opts', loc: { start: [ 5, 19 ], end: [ 5, 23 ] } },
        { type: 'punctuator', value: '.', loc: { start: [ 5, 23 ], end: [ 5, 24 ] } },
        { type: 'identifier', value: 'isSweet', loc: { start: [ 5, 24 ], end: [ 5, 31 ] } },
        { type: 'indention', value: 2, loc: { start: [ 7, 0 ], end: [ 7, 2 ] } },
        { type: 'identifier', value: 'peel', loc: { start: [ 7, 2 ], end: [ 7, 6 ] } },
        { type: 'punctuator', value: '(', loc: { start: [ 7, 7 ], end: [ 7, 8 ] } },
        { type: 'punctuator', value: ')', loc: { start: [ 7, 8 ], end: [ 7, 9 ] } },
        { type: 'indention', value: 4, loc: { start: [ 8, 0 ], end: [ 8, 4 ] } },
        { type: 'identifier', value: 'this', loc: { start: [ 8, 4 ], end: [ 8, 8 ] } },
        { type: 'punctuator', value: '.', loc: { start: [ 8, 8 ], end: [ 8, 9 ] } },
        { type: 'identifier', value: '__isPeeled', loc: { start: [ 8, 9 ], end: [ 8, 19 ] } },
        { type: 'operator', value: '=', loc: { start: [ 8, 20 ], end: [ 8, 21 ] } },
        { type: 'literal', value: 'true', loc: { start: [ 8, 22 ], end: [ 8, 26 ] } },
        { type: 'indention', value: 0, loc: { start: [ 10, 0 ], end: [ 10, 0 ] } },
        { type: 'keyword', value: 'export', loc: { start: [ 10, 0 ], end: [ 10, 6 ] } },
        { type: 'identifier', value: 'default', loc: { start: [ 10, 7 ], end: [ 10, 14 ] } },
        { type: 'identifier', value: 'Banana', loc: { start: [ 10, 15 ], end: [ 10, 21 ] } },
        { type: 'indention', value: 0, loc: { start: [ 11, 0 ], end: [ 11, 0 ] } }
      ])
    })

    it('detects string and template literals', () => {
      const coconutSource = inspect.readFile(path.join(__dirname, '../fixtures/coconut.fire'))
      const tokenizer = new Tokenizer()
      const token = tokenizer.tokenize(coconutSource)
      inspect(token).isArray()
      inspect(token).isEql([
        { type: 'keyword', value: 'const' },
        { type: 'identifier', value: 'fruit' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '"coconut"' },
        { type: 'indention', value: 0 },
        { type: 'keyword', value: 'const' },
        { type: 'identifier', value: 'kind' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '\'nut\'' },
        { type: 'indention', value: 0 },
        { type: 'identifier', value: 'module' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'exports' },
        { type: 'operator', value: '=' },
        { type: 'template', value: 'A ${' },
        { type: 'identifier', value: 'fruit' },
        { type: 'template', value: '} is a tasty ${' },
        { type: 'identifier', value: 'kind' },
        { type: 'template', value: '}' },
        { type: 'indention', value: 0 }
      ])
    })
  })
})
