const inspect = require('inspect.js')

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('Program', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves an identifier', () => {
      parser.parse('const banana = foo')
      const nodeName = parser.createNode('Program')
      inspect(nodeName).isEql('Program')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('returns an identifier item', () => {
      parser.parse('const banana = foo')
      const node = parser.createNode('Program')
      inspect(node).hasProps({
        type: 'Program',
        body: [{
          type: 'VariableDeclarator',
          kind: 'const'
        }]
      })
    })
  })
})
