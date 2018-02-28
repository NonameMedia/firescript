const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const SpreadElement = require('../../../src/fs-nodes/SpreadElement')

describe('SpreadElement', () => {
  describe('instance', () => {
    const tokenStack = new TokenStack([
      { 'type': 'punctuator', 'value': '...' },
      { 'type': 'identifier', 'value': 'args' }
    ])

    it('returns a SpreadElement node', () => {
      const node = new SpreadElement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('SpreadElement')
      inspect(node.toJSON()).isEql({
        type: 'SpreadElement',
        argument: {
          type: 'Identifier',
          name: 'args'
        }
      })
    })
  })
})
