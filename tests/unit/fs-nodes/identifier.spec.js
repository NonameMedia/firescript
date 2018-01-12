const inspect = require('inspect.js')
const Identifier = require('../../../src/fs-nodes/Identifier')

describe('Identifier', () => {
  describe('instance', () => {
    const tokenStack = [
      { 'type': 'identifier', 'value': 'res' }
    ]

    it('returns a fs-node item', () => {
      const node = new Identifier(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Identifier')
      inspect(node.name).isString()
      inspect(node.name).isEql('res')
    })
  })
})
