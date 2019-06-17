const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')

describe('VariableDeclarator', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../../src/fs-parser/')
      })
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
      parser = new Parser({
        confDir: path.join(__dirname, '../../../src/fs-parser/')
      })
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
