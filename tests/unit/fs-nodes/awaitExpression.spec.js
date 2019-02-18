const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const AwaitExpression = require('../../../src/fs-nodes/AwaitExpression')

describe('AwaitExpression', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a AwaitExpression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'await' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new AwaitExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('AwaitExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'AwaitExpression',
        argument: {
          type: 'Identifier',
          name: 'banana'
        }
      })
    })
  })
})
