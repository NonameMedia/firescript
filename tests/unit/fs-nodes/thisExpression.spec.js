const inspect = require('inspect.js')
const ThisExpression = require('../../../src/fs-nodes/ThisExpression')

describe('ThisExpression', () => {
  describe('instance', () => {
    const tokenStack = [
      { 'type': 'identifier', 'value': 'this' }
    ]

    it('returns a fs-node item', () => {
      const node = new ThisExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ThisExpression')
    })
  })
})
