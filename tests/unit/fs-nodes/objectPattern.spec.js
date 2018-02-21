const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ObjectPattern = require('../../../src/fs-nodes/ObjectPattern')

describe.only('ObjectPattern', () => {
  describe('instance', () => {
    it('returns an object node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'punctuator', 'value': '{' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': ':' },
        { 'type': 'numeric', 'value': '1' },
        { 'type': 'punctuator', 'value': ',' },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'punctuator', 'value': ':' },
        { 'type': 'numeric', 'value': '2' },
        { 'type': 'punctuator', 'value': '}' }
      ])

      const node = new ObjectPattern(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ObjectPattern')
      inspect(node.properties).isArray()
      inspect(node.properties).hasLength(2)
      inspect(node.properties[0].toJSON()).isEql({
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'foo'
        },
        value: {
          'type': 'Literal',
          'value': 1,
          'raw': '1'
        },
        computed: false,
        method: false,
        kind: 'init',
        shorthand: false
      })

      inspect(node.properties[1].toJSON()).isEql({
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'bar'
        },
        value: {
          'type': 'Literal',
          'value': 2,
          'raw': '2'
        },
        computed: false,
        method: false,
        kind: 'init',
        shorthand: false
      })
    })

    it('returns an object node, braceless syntax', () => {
      const tokenStack = new TokenStack([
        { 'type': 'indention', 'value': 2 },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': ':' },
        { 'type': 'numeric', 'value': '1' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'punctuator', 'value': ':' },
        { 'type': 'numeric', 'value': '2' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ObjectPattern(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ObjectPattern')
      inspect(node.properties).isArray()
      inspect(node.properties).hasLength(2)
      inspect(node.properties[0].toJSON()).isEql({
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'foo'
        },
        value: {
          'type': 'Literal',
          'value': 1,
          'raw': '1'
        },
        computed: false,
        method: false,
        kind: 'init',
        shorthand: false
      })

      inspect(node.properties[1].toJSON()).isEql({
        type: 'Property',
        key: {
          type: 'Identifier',
          name: 'bar'
        },
        value: {
          'type': 'Literal',
          'value': 2,
          'raw': '2'
        },
        computed: false,
        method: false,
        kind: 'init',
        shorthand: false
      })
    })
  })
})
