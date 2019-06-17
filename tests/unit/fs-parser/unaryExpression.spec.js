const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')

describe('UnaryExpression (const)', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../../src/fs-parser/')
      })
    })

    it('resolves a node name', () => {
      parser.parse('-123')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('UnaryExpression')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../../src/fs-parser/')
      })
    })

    it('returns a negative number', () => {
      parser.parse('-123')
      const node = parser.createNode('UnaryExpression')
      inspect(node).isEql({
        type: 'UnaryExpression',
        operator: '-',
        argument: {
          type: 'Literal',
          raw: '123',
          value: '123'
        },
        prefix: true
      })
    })
  })
})
