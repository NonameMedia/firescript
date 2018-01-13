const inspect = require('inspect.js')
const ArrayExpression = require('../../../src/fs-nodes/ArrayExpression')

describe('ArrayExpression', () => {
  describe('instance', () => {
    const tokenStack = [
      { 'type': 'punctuator', 'value': '[' },
      { 'type': 'numeric', 'value': '1' },
      { 'type': 'punctuator', 'value': ',' },
      { 'type': 'numeric', 'value': '2' },
      { 'type': 'punctuator', 'value': ']' }
    ]

    it('returns a fs-node item', () => {
      const node = new ArrayExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ArrayExpression')
      inspect(node.elements).isArray()
    })
  })
})
