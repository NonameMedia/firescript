const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ExportDefaultDeclaration = require('../../../src/fs-nodes/ExportDefaultDeclaration')

describe('ExportDefaultDeclaration', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a ExportDefaultDeclaration node with an ImportDefaultSpecifier', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'operator', 'value': '**' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportDefaultDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportDefaultDeclaration')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ExportDefaultDeclaration',
        declaration: {
          type: 'Identifier',
          name: 'foo'
        }
      })
    })
  })
})
