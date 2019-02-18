const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const DoWhileStatement = require('../../../src/fs-nodes/DoWhileStatement')

describe('DoWhileStatement', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns an DoWhileStatement', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'do' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'operator', 'value': '--' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 },
        { 'type': 'keyword', 'value': 'while' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new DoWhileStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('DoWhileStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'DoWhileStatement',
        test: {
          type: 'Identifier',
          name: 'banana'
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
