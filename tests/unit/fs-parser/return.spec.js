const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('ReturnStatement', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a ReturnStatement', () => {
      parser.parse('return banana')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('ReturnStatement')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('parse a return statement', () => {
      parser.parse('return banana')
      const node = parser.createNode('ReturnStatement')
      inspect(node).hasProps({
        type: 'ReturnStatement',
        argument: {
          type: 'Identifier',
          name: 'banana'
        }
      })
    })

    it('parse an empty return statement', () => {
      parser.parse('return')
      const node = parser.createNode('ReturnStatement')
      inspect(node).hasProps({
        type: 'ReturnStatement',
        argument: null
      })
    })
  })
})
