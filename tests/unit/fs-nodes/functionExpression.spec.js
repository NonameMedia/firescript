const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const FunctionExpression = require('../../../src/fs-nodes/FunctionExpression')

describe('FunctionExpression', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a function expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'func' },
        { type: 'identifier', value: 'bla' },
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

      const node = new FunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionExpression')
      inspect(node.id).isObject()
      inspect(node.id.toJSON(ctx)).isEql({
        type: 'Identifier',
        name: 'bla'
      })
      inspect(node.params).isArray()
      inspect(node.params).hasLength(1)
      inspect(node.body).isObject()
      inspect(node.async).isFalse()
      inspect(node.expression).isFalse()
      inspect(node.generator).isFalse()
    })

    it('returns a function expression node, anonyous function', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'func' },
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

      const node = new FunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionExpression')
      inspect(node.id).isNull()
      inspect(node.params).isArray()
      inspect(node.params).hasLength(1)
      inspect(node.body).isObject()
      inspect(node.async).isFalse()
      inspect(node.expression).isFalse()
      inspect(node.generator).isFalse()
    })

    it('returns a function expression node, generator function', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'gen' },
        { type: 'identifier', value: 'blub' },
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

      const node = new FunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionExpression')
      inspect(node.id).isObject()
      inspect(node.id.toJSON(ctx)).isEql({
        type: 'Identifier',
        name: 'blub'
      })
      inspect(node.params).isArray()
      inspect(node.params).hasLength(1)
      inspect(node.body).isObject()
      inspect(node.async).isFalse()
      inspect(node.expression).isFalse()
      inspect(node.generator).isTrue()
    })

    it('returns a function expression node, anonyous generator function', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'gen' },
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

      const node = new FunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionExpression')
      inspect(node.id).isNull()
      inspect(node.params).isArray()
      inspect(node.params).hasLength(1)
      inspect(node.body).isObject()
      inspect(node.async).isFalse()
      inspect(node.expression).isFalse()
      inspect(node.generator).isTrue()
    })

    it('returns a function expression node, async function', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'async' },
        { type: 'identifier', value: 'blub' },
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

      const node = new FunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionExpression')
      inspect(node.id).isObject()
      inspect(node.id.toJSON(ctx)).isEql({
        type: 'Identifier',
        name: 'blub'
      })
      inspect(node.params).isArray()
      inspect(node.params).hasLength(1)
      inspect(node.body).isObject()
      inspect(node.async).isTrue()
      inspect(node.expression).isFalse()
      inspect(node.generator).isFalse()
    })
  })
})
