const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ReturnStatement = require('../../../src/fs-nodes/ReturnStatement')

describe('ReturnStatement', () => {
  describe('instance', () => {
    const ctx = {}

    const tokenStack = new TokenStack([
      { 'type': 'keyword', 'value': 'return' },
      { 'type': 'identifier', 'value': 'banana' },
      { 'type': 'indention', 'value': 0 }
    ])

    it('returns a fs-node item', () => {
      const node = new ReturnStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ReturnStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ReturnStatement',
        argument: {
          type: 'Identifier',
          name: 'banana'
        }
      })
    })
  })
})
