const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ExportAllDeclaration = require('../../../src/fs-nodes/ExportAllDeclaration')

describe('ExportAllDeclaration', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a ExportAllDeclaration node with an ImportDefaultSpecifier', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'operator', 'value': '*' },
        { 'type': 'identifier', 'value': 'from' },
        { 'type': 'literal', 'value': '\'banana\'' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportAllDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportAllDeclaration')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ExportAllDeclaration',
        source: {
          type: 'Literal',
          raw: '\'banana\'',
          value: 'banana'
        }
      })
    })
  })
})
