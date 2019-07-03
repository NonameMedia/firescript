const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('UnaryExpression', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a node name', () => {
      parser.parse('-123')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('UnaryExpression')
    })

    it('resolves a + unary operator', () => {
      parser.parse('+i')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('UnaryExpression')
    })

    it('resolves a - unary operator', () => {
      parser.parse('-i')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('UnaryExpression')
    })

    it('resolves a + unary operator', () => {
      parser.parse('~i')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('UnaryExpression')
    })

    it('resolves a ! unary operator', () => {
      parser.parse('!i')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('UnaryExpression')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it.skip('returns a negative number', () => {
      parser.parse('-123')
      const node = parser.createNode('UnaryExpression')
      inspect(node).hasProps({
        type: 'UnaryExpression',
        operator: '-',
        argument: {
          type: 'Literal',
          raw: '123',
          value: 123
        },
        prefix: true
      })
    })
  })
})
