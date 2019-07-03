const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe.only('VariableDeclaration (const)', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a node name', () => {
      parser.parse('const banana = \'Banana\'')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('VariableDeclaration')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('returns a VariableDeclaration item', () => {
      parser.parse('const banana = \'Banana\'')
      const node = parser.createNode('VariableDeclaration')
      inspect(node).hasProps({
        type: 'VariableDeclaration'
      })
    })

    it('returns a VariableDeclaration item', () => {
      parser.parse('let banana = \'Banana\'')
      const node = parser.createNode('VariableDeclaration')
      inspect(node).hasProps({
        type: 'VariableDeclaration'
      })
    })

    it('returns a VariableDeclaration item', () => {
      parser.parse('var banana = \'Banana\'')
      const node = parser.createNode('VariableDeclaration')
      inspect(node).hasProps({
        type: 'VariableDeclaration'
      })
    })
  })
})
