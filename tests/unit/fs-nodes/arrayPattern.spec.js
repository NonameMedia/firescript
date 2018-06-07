const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ArrayPattern = require('../../../src/fs-nodes/ArrayPattern')

describe('ArrayPattern', () => {
  describe('instance', () => {
    it('returns an ArrayPattern node, using inline syntax', () => {
      const tokenStack = new TokenStack([
        { 'type': 'punctuator', 'value': '[' },
        { 'type': 'identifier', 'value': 'a' },
        { 'type': 'punctuator', 'value': ',' },
        { 'type': 'identifier', 'value': 'b' },
        { 'type': 'punctuator', 'value': ']' }
      ])

      const node = new ArrayPattern(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ArrayPattern')
      inspect(node.elements).isArray()
      inspect(node.elements).hasLength(2)
      inspect(node.elements[0].toJSON()).isEql({
        'type': 'Identifier',
        'name': 'a'
      })

      inspect(node.elements[1].toJSON()).isEql({
        'type': 'Identifier',
        'name': 'b'
      })
    })
  })
})
