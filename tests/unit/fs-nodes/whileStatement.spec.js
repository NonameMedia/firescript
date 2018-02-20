const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const WhileStatement = require('../../../src/fs-nodes/WhileStatement')

describe('WhileStatement', () => {
  describe('instance', () => {
    it('returns an WhileStatement', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'while' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'operator', 'value': '--' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new WhileStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('WhileStatement')
      inspect(node.toJSON()).isEql({
        type: 'WhileStatement',
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
