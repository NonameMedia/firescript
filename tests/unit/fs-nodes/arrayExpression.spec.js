const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ArrayExpression = require('../../../src/fs-nodes/ArrayExpression')

describe('ArrayExpression', () => {
  describe('instance', () => {
    it('returns an ArrayExpression node, using inline syntax', () => {
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

    it('returns an ArrayExpression node, using multiline syntax, complex structure', () => {
      const tokenStack = new TokenStack([
        { type: 'punctuator', value: '[' },
        { type: 'indention', value: 2 },
        { type: 'literal', value: '\'Foo\'' },
        { type: 'indention', value: 2 },
        { type: 'literal', value: '\'Bar\'' },
        { type: 'indention', value: 4 },
        { type: 'identifier', value: 'bla' },
        { type: 'punctuator', value: ':' },
        { type: 'punctuator', value: '[' },
        { type: 'indention', value: 6 },
        { type: 'literal', value: '\'bla\'' },
        { type: 'indention', value: 6 },
        { type: 'literal', value: '\'blabla\'' },
        { type: 'indention', value: 4 },
        { type: 'punctuator', value: ']' },
        { type: 'indention', value: 4 },
        { type: 'identifier', value: 'one' },
        { type: 'punctuator', value: ':' },
        { type: 'numeric', value: '1' },
        { type: 'indention', value: 4 },
        { type: 'identifier', value: 'two' },
        { type: 'punctuator', value: ':' },
        { type: 'indention', value: 6 },
        { type: 'literal', value: '\'number\'' },
        { type: 'punctuator', value: ':' },
        { type: 'numeric', value: '2' },
        { type: 'indention', value: 4 },
        { type: 'identifier', value: 'three' },
        { type: 'punctuator', value: ':' },
        { type: 'literal', value: '\'3\'' },
        { type: 'indention', value: 0 },
        { type: 'punctuator', value: ']' },
        { type: 'indention', value: 0 }

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
  })
})
