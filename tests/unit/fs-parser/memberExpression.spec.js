const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')

describe.only('MemberExpression', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../../src/fs-parser/')
      })
    })

    it('resolves a node name', () => {
      parser.parse('fruits.banana')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Identifier')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../../src/fs-parser/')
      })
    })

    it('returns a MemberExpression item', () => {
      parser.parse('fruits.banana')
      const node = parser.createNode('MemberExpression')
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': false,
        'object': {
          'type': 'Identifier',
          'name': 'fruits'
        },
        'property': {
          'type': 'Identifier',
          'name': 'banana'
        }
      })
    })

    it('returns a MemberExpression with a MemberExpression', () => {
      parser.parse('fruits.banana.color')
      const node = parser.createNode('MemberExpression')
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': false,
        'object': {
          'type': 'MemberExpression',
          'computed': false,
          'object': {
            'type': 'Identifier',
            'name': 'fruits'
          },
          'property': {
            'type': 'Identifier',
            'name': 'banana'
          }
        },
        'property': {
          'type': 'Identifier',
          'name': 'color'
        }
      })
    })
  })
})
