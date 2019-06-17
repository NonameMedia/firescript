const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')

describe('Identifier', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../../src/fs-parser/')
      })
    })

    it('resolves an identifier', () => {
      parser.parse('banana = foo')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Identifier')
    })

    it('resolves undefined as an identifier', () => {
      parser.parse('undefined')
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

    it('returns an identifier item', () => {
      parser.parse('banana = foo')
      const node = parser.createNode('Identifier')
      inspect(node).hasProps({
        type: 'Identifier',
        name: 'banana'
      })
    })

    it('returns undefined as an identifier item', () => {
      parser.parse('undefined')
      const node = parser.createNode('Identifier')
      inspect(node).hasProps({
        type: 'Identifier',
        name: 'undefined'
      })
    })
  })
})
