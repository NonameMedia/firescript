const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('CallExpression', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a CallExpression', () => {
      parser.parse('banana()')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Identifier')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('parse a call expression', () => {
      parser.parse('banana()')
      const node = parser.nextNode(this)
      inspect(node).hasProps({
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'banana'
        },
        arguments: []
      })
    })

    it('parse a call expression with arguments', () => {
      parser.parse('banana(\'yellow\')')
      const node = parser.nextNode(this)
      inspect(node).hasProps({
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'banana'
        },
        arguments: [{
          type: 'Literal',
          raw: '\'yellow\'',
          value: 'yellow'
        }]
      })
    })
  })
})
