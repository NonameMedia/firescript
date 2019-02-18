const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ThrowStatement = require('../../../src/fs-nodes/ThrowStatement')

describe('ThrowStatement', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a ThrowStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'throw' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ThrowStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ThrowStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ThrowStatement',
        argument: {
          type: 'Identifier',
          name: 'banana'
        }
      })
    })
  })
})
