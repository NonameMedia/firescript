const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const BlockStatement = require('../../../src/fs-nodes/BlockStatement')

describe('BlockStatement', () => {
  describe('instance', () => {
    it('returns a block statement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'const' },
        { 'type': 'identifier', 'value': 'res' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'identifier', 'value': 'num1' }
      ])

      const node = new BlockStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('BlockStatement')
      inspect(node.body).isArray()
      inspect(node.toJSON()).isEql({
        type: 'BlockStatement',
        body: [{
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'res'
            },
            init: {
              type: 'Identifier',
              name: 'num1'
            },
            'fsTyping': {
              'type': 'FirescriptTyping',
              'name': 'any'
            }
          }]
        }]
      })
    })

    it('returns a block statement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'const' },
        { 'type': 'identifier', 'value': 'res' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'identifier', 'value': 'this' },
        { 'type': 'punctuator', 'value': '.' },
        { 'type': 'identifier', 'value': 'num1' }
      ])

      const node = new BlockStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('BlockStatement')
      inspect(node.body).isArray()
      inspect(node.toJSON()).isEql({
        type: 'BlockStatement',
        body: [{
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'res'
            },
            init: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'ThisExpression'
              },
              property: {
                type: 'Identifier',
                name: 'num1'
              }
            },
            fsTyping: {
              type: 'FirescriptTyping',
              name: 'any'
            }
          }]
        }]
      })
    })
  })
})
