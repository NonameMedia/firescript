const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ThisExpression = require('../../../src/fs-nodes/ThisExpression')

describe('ThisExpression', () => {
  describe('instance', () => {
    const ctx = {}

    const tokenStack = new TokenStack([
      { 'type': 'identifier', 'value': 'this' }
    ])

    it('returns a fs-node item', () => {
      const node = new ThisExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ThisExpression')
    })
  })
})
