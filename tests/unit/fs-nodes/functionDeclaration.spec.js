const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const FunctionDeclaration = require('../../../src/fs-nodes/FunctionDeclaration')

describe('FunctionDeclaration', () => {
  describe('instance', () => {
    it('returns a FunctionDeclaration node', () => {
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

      const node = new FunctionDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionDeclaration')
      inspect(node.id).isObject()
      inspect(node.id.toJSON()).isEql({
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

    it('returns a FunctionDeclaration node, anonymous function', () => {
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

      const node = new FunctionDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionDeclaration')
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
