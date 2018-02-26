const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ExportDefaultDeclaration = require('../../../src/fs-nodes/ExportDefaultDeclaration')

describe('ExportDefaultDeclaration', () => {
  describe('instance', () => {
    it('returns a ExportDefaultDeclaration node with an ImportDefaultSpecifier', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportDefaultDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportDefaultDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportDefaultDeclaration',
        declaration: {
          type: 'Identifier',
          name: 'foo'
        }
      })
    })
  })
})
