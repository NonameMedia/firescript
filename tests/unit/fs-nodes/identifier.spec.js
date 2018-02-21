const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const Identifier = require('../../../src/fs-nodes/Identifier')

describe('Identifier', () => {
  describe('instance', () => {
    const tokenStack = new TokenStack([
      { 'type': 'identifier', 'value': 'res' }
    ])

    it('returns a Identifier node', () => {
      const node = new Identifier(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Identifier')
      inspect(node.name).isString()
      inspect(node.name).isEql('res')
    })
  })
})
