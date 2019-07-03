const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('MemberExpression', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a node name', () => {
      parser.parse('fruits.banana')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Identifier')
    })
  })

  describe('nextNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('returns a MemberExpression item', () => {
      parser.parse('fruits.banana')
      const node = parser.nextNode()
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
      const node = parser.nextNode('MemberExpression')
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

    it('returns a MemberExpression with a MemberExpression', () => {
      parser.parse('fruits.banana.color.getColor')
      const node = parser.nextNode('MemberExpression')
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': false,
        'object': {
          'type': 'MemberExpression',
          'computed': false,
          'object': {
            type: 'MemberExpression',
            computed: false,
            object: {
              'type': 'Identifier',
              'name': 'fruits'
            },
            property: {
              'type': 'Identifier',
              'name': 'banana'
            }
          },
          'property': {
            'type': 'Identifier',
            'name': 'color'
          }
        },
        'property': {
          'type': 'Identifier',
          'name': 'getColor'
        }
      })
    })

    it('returns a MemberExpression item, computed syntax', () => {
      parser.parse('fruits[\'banana\']')
      const node = parser.nextNode()
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': true,
        'object': {
          'type': 'Identifier',
          'name': 'fruits'
        },
        'property': {
          'type': 'Literal',
          'value': 'banana',
          'raw': '\'banana\''
        }
      })
    })

    it('returns a MemberExpression with a MemberExpression', () => {
      parser.parse('fruits[\'banana\'][\'color\']')
      const node = parser.nextNode('MemberExpression')
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': true,
        'object': {
          'type': 'MemberExpression',
          'computed': true,
          'object': {
            'type': 'Identifier',
            'name': 'fruits'
          },
          'property': {
            'type': 'Literal',
            'value': 'banana',
            'raw': '\'banana\''
          }
        },
        'property': {
          'type': 'Literal',
          'value': 'color',
          'raw': '\'color\''
        }
      })
    })

    it('returns a MemberExpression with a MemberExpression', () => {
      parser.parse('fruits[\'banana\'][\'color\'][\'getColor\']')
      const node = parser.nextNode('MemberExpression')
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': true,
        'object': {
          'type': 'MemberExpression',
          'computed': true,
          'object': {
            type: 'MemberExpression',
            computed: true,
            object: {
              'type': 'Identifier',
              'name': 'fruits'
            },
            property: {
              'type': 'Literal',
              'value': 'banana',
              'raw': '\'banana\''
            }
          },
          'property': {
            'type': 'Literal',
            'value': 'color',
            'raw': '\'color\''
          }
        },
        'property': {
          'type': 'Literal',
          'value': 'getColor',
          'raw': '\'getColor\''
        }
      })
    })

    it.skip('returns a MemberExpression item with a function expression', () => {
      parser.parse('fruits.getBanana()')
      const node = parser.nextNode()
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': false,
        'object': {
          'type': 'Identifier',
          'name': 'fruits'
        },
        'property': {
          'type': 'FunctionExpression',
          'name': 'getBanana'
        }
      })
    })

    it.skip('returns a MemberExpression with a MemberExpression', () => {
      parser.parse('fruits.banana.color')
      const node = parser.nextNode('MemberExpression')
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

    it.skip('returns a MemberExpression with a MemberExpression', () => {
      parser.parse('fruits.banana.color.getColor')
      const node = parser.nextNode('MemberExpression')
      inspect(node).hasProps({
        'type': 'MemberExpression',
        'computed': false,
        'object': {
          'type': 'MemberExpression',
          'computed': false,
          'object': {
            type: 'MemberExpression',
            computed: false,
            object: {
              'type': 'Identifier',
              'name': 'fruits'
            },
            property: {
              'type': 'Identifier',
              'name': 'banana'
            }
          },
          'property': {
            'type': 'Identifier',
            'name': 'color'
          }
        },
        'property': {
          'type': 'Identifier',
          'name': 'getColor'
        }
      })
    })
  })
})
