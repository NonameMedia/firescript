const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ForInStatement = require('../../../src/fs-nodes/ForInStatement')

describe('ForInStatement', () => {
  describe('instance', () => {
    it('returns an ForInStatement', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'for' },
        { 'type': 'identifier', 'value': 'item' },
        { 'type': 'identifier', 'value': 'in' },
        { 'type': 'identifier', 'value': 'obj' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'operator', 'value': '--' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ForInStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ForInStatement')
      inspect(node.toJSON()).isEql({
        type: 'ForInStatement',
        left: {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'item'
            },
            init: null,
            fsTyping: {
  type: 'FirescriptTyping',
  name: 'any'
}
          }]
        },
        right: {
          type: 'Identifier',
          name: 'obj'
        },
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'banana'
              },
              operator: '--',
              prefix: true
            }
          }]
        }
      })
    })
  })
})
