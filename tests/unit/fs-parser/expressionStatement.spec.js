const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('ExpressionStatement', () => {
  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('returns an identifier item', () => {
      parser.parse('banana')
      const child = parser.createNode('Identifier')
      const node = parser.createNode('ExpressionStatement', child)
      inspect(node).hasProps({
        type: 'ExpressionStatement',
        expression: {
          type: 'Identifier',
          name: 'banana'
        }
      })
    })
  })
})
