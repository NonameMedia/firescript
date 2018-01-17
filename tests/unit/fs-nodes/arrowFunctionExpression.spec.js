const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ArrowFunctionExpression = require('../../../src/fs-nodes/ArrowFunctionExpression')

describe('ArrowFunctionExpression', () => {
  describe('instance', () => {
    it('returns a arrow function expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'num1' },
        { type: 'punctuator', value: ')' },
        { type: 'punctuator', value: '=>' },
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
  })
})
