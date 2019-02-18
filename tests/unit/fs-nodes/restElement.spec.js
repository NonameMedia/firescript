const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const RestElement = require('../../../src/fs-nodes/RestElement')

describe('RestElement', () => {
  describe('instance', () => {
    const ctx = {}

    const tokenStack = new TokenStack([
      { 'type': 'punctuator', 'value': '...' },
      { 'type': 'identifier', 'value': 'args' }
    ])

    it('returns a RestElement node', () => {
      const node = new RestElement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('RestElement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'RestElement',
        argument: {
          type: 'Identifier',
          name: 'args'
        }
      })
    })
  })
})
