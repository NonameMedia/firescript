const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const YieldExpression = require('../../../src/fs-nodes/YieldExpression')

describe('YieldExpression', () => {
  describe('instance', () => {
    const ctx = {}
    it('returns a YieldExpression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'yield' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new YieldExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('YieldExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'YieldExpression',
        argument: {
          type: 'Identifier',
          name: 'banana'
        },
        delegate: false
      })
    })

    it('returns a YieldExpression node with delegation', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'yield' },
        { 'type': 'operator', 'value': '*' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new YieldExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('YieldExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'YieldExpression',
        argument: {
          type: 'Identifier',
          name: 'banana'
        },
        delegate: true
      })
    })
  })
})
