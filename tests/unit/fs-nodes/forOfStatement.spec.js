const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ForOfStatement = require('../../../src/fs-nodes/ForOfStatement')

describe('ForOfStatement', () => {
  describe('instance', () => {
    it('returns an ForOfStatement', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'for' },
        { 'type': 'identifier', 'value': 'item' },
        { 'type': 'identifier', 'value': 'of' },
        { 'type': 'identifier', 'value': 'arr' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'operator', 'value': '--' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ForOfStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ForOfStatement')
      inspect(node.toJSON()).isEql({
        type: 'ForOfStatement',
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
            fsType: null
          }]
        },
        right: {
          type: 'Identifier',
          name: 'arr'
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
