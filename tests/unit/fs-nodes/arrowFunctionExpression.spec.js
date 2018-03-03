const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ArrowFunctionExpression = require('../../../src/fs-nodes/ArrowFunctionExpression')

describe('ArrowFunctionExpression', () => {
  describe('instance', () => {
    it('returns an arrow function expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'operator', value: '=>' },
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'num1' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '2' },
        { type: 'keyword', value: 'const' },
        { type: 'identifier', value: 'res' },
        { type: 'operator', value: '=' },
        { type: 'identifier', value: 'num1' },
        { type: 'operator', value: '+' },
        { type: 'numeric', value: '1' },
        { type: 'indention', value: '2' },
        { type: 'keyword', value: 'return' },
        { type: 'identifier', value: 'res' },
        { type: 'indention', value: '0' }
      ])

      const node = new ArrowFunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ArrowFunctionExpression')
      inspect(node.id).isNull()
      inspect(node.params).isArray()
      inspect(node.params).hasLength(1)
      inspect(node.body).isObject()
      inspect(node.async).isFalse()
      inspect(node.expression).isFalse()
      inspect(node.generator).isFalse()
    })

    it('returns a async arrow function expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'operator', value: '=>' },
        { type: 'keyword', value: 'async' },
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'num1' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '2' },
        { type: 'keyword', value: 'const' },
        { type: 'identifier', value: 'res' },
        { type: 'operator', value: '=' },
        { type: 'identifier', value: 'num1' },
        { type: 'operator', value: '+' },
        { type: 'numeric', value: '1' },
        { type: 'indention', value: '2' },
        { type: 'keyword', value: 'return' },
        { type: 'identifier', value: 'res' },
        { type: 'indention', value: '0' }
      ])

      const node = new ArrowFunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ArrowFunctionExpression')
      inspect(node.id).isNull()
      inspect(node.params).isArray()
      inspect(node.params).hasLength(1)
      inspect(node.body).isObject()
      inspect(node.async).isTrue()
      inspect(node.expression).isFalse()
      inspect(node.generator).isFalse()
    })

    it('returns an arrow function expression node with two arguments', () => {
      const tokenStack = new TokenStack([
        { type: 'operator', value: '=>' },
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'num1' },
        { type: 'punctuator', value: ',' },
        { type: 'identifier', value: 'num2' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '2' },
        { type: 'keyword', value: 'const' },
        { type: 'identifier', value: 'res' },
        { type: 'operator', value: '=' },
        { type: 'identifier', value: 'num1' },
        { type: 'operator', value: '+' },
        { type: 'numeric', value: '1' },
        { type: 'indention', value: '2' },
        { type: 'keyword', value: 'return' },
        { type: 'identifier', value: 'res' },
        { type: 'indention', value: '0' }
      ])

      const node = new ArrowFunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ArrowFunctionExpression')
      inspect(node.id).isNull()
      inspect(node.params).isArray()
      inspect(node.params).hasLength(2)
      inspect(node.body).isObject()
      inspect(node.async).isFalse()
      inspect(node.expression).isFalse()
      inspect(node.generator).isFalse()
    })
  })
})
