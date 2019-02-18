const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ArrayExpression = require('../../../src/fs-nodes/ArrayExpression')

describe('ArrayExpression', () => {
  describe('instance', () => {
    const ctx = {}

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
      inspect(node.elements[0].toJSON(ctx)).isEql({
        'type': 'Literal',
        'value': 1,
        'raw': '1'
      })

      inspect(node.elements[1].toJSON(ctx)).isEql({
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
      inspect(node.elements[0].toJSON(ctx)).isEql({
        'type': 'Literal',
        'value': 1,
        'raw': '1'
      })

      inspect(node.elements[1].toJSON(ctx)).isEql({
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
        { type: 'indention', value: 2 },
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
      inspect(node.toJSON(ctx)).isEql({
        'type': 'ArrayExpression',
        'elements': [{
          'type': 'Literal',
          'value': 'Foo',
          'raw': "'Foo'"
        }, {
          'type': 'Literal',
          'value': 'Bar',
          'raw': "'Bar'"
        }, {
          'type': 'ObjectExpression',
          'properties': [{
            'type': 'Property',
            'key': {
              'type': 'Identifier',
              'name': 'bla'
            },
            'computed': false,
            'value': {
              'type': 'ArrayExpression',
              'elements': [{
                'type': 'Literal',
                'value': 'bla',
                'raw': "'bla'"
              }, {
                'type': 'Literal',
                'value': 'blabla',
                'raw': "'blabla'"
              }
              ]},
            'kind': 'init',
            'method': false,
            'shorthand': false
          }, {
            'type': 'Property',
            'key': {
              'type': 'Identifier',
              'name': 'one'
            },
            'computed': false,
            'value': {
              'type': 'Literal',
              'value': 1,
              'raw': '1'
            },
            'kind': 'init',
            'method': false,
            'shorthand': false
          }, {
            'type': 'Property',
            'key': {
              'type': 'Identifier',
              'name': 'two'
            },
            'computed': false,
            'value': {
              'type': 'ObjectExpression',
              'properties': [{
                'type': 'Property',
                'key': {
                  'type': 'Literal',
                  'value': 'number',
                  'raw': "'number'"
                },
                'computed': false,
                'value': {
                  'type': 'Literal',
                  'value': 2,
                  'raw': '2'
                },
                'kind': 'init',
                'method': false,
                'shorthand': false
              }]
            },
            'kind': 'init',
            'method': false,
            'shorthand': false
          }, {
            'type': 'Property',
            'key': {
              'type': 'Identifier',
              'name': 'three'
            },
            'computed': false,
            'value': {
              'type': 'Literal',
              'value': '3',
              'raw': "'3'"
            },
            'kind': 'init',
            'method': false,
            'shorthand': false
          }]
        }]
      })
    })
  })
})
