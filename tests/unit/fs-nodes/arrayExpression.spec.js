const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ArrayExpression = require('../../../src/fs-nodes/ArrayExpression')

describe('ArrayExpression', () => {
  describe('instance', () => {
    it('returns a array item', () => {
      const tokenStack = new TokenStack([
        { 'type': 'punctuator', 'value': '[' },
        { 'type': 'numeric', 'value': '1' },
        { 'type': 'punctuator', 'value': ',' },
        { 'type': 'numeric', 'value': '2' },
        { 'type': 'punctuator', 'value': ']' }
      ])

      const node = new ArrayExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ArrayExpression')
      inspect(node.elements).isArray()
      inspect(node.elements).hasLength(2)
      inspect(node.elements[0].toJSON()).isEql({
        'type': 'Literal',
        'value': 1,
        'raw': '1'
      })

      inspect(node.elements[1].toJSON()).isEql({
        'type': 'Literal',
        'value': 2,
        'raw': '2'
      })
    })

    it('returns a array item, braceless syntax', () => {
      const tokenStack = new TokenStack([
        { 'type': 'indention', 'value': 2 },
        { 'type': 'numeric', 'value': '1' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'numeric', 'value': '2' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ArrayExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ArrayExpression')
      inspect(node.elements).hasLength(2)
      inspect(node.elements[0].toJSON()).isEql({
        'type': 'Literal',
        'value': 1,
        'raw': '1'
      })

      inspect(node.elements[1].toJSON()).isEql({
        'type': 'Literal',
        'value': 2,
        'raw': '2'
      })
    })
  })
})
