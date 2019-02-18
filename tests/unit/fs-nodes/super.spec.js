const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const Super = require('../../../src/fs-nodes/Super')

describe('Super', () => {
  describe('instance', () => {
    const ctx = {}

    const tokenStack = new TokenStack([
      { 'type': 'identifier', 'value': 'super' }
    ])

    it('returns a fs-node item', () => {
      const node = new Super(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Super')
    })
  })
})
