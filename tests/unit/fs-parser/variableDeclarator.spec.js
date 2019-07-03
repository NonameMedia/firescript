const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('VariableDeclarator', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a node name', () => {
      parser.parse('banana = \'Banana\'')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Identifier')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('returns a VariableDeclarator item', () => {
      parser.parse('banana = \'Banana\'')
      const node = parser.createNode('VariableDeclarator')
      inspect(node).hasProps({
        type: 'VariableDeclarator'
      })
    })
  })
})
