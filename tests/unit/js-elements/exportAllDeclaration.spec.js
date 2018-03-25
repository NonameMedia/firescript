const inspect = require('inspect.js')
const ExportAllDeclaration = require('../../../src/js-elements/ExportAllDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ExportAllDeclaration', () => {
    it('renders a ExportAllDeclaration element', () => {
      const ast = require('../../fixtures/ast/exportAllDeclaration.json')
      const ctx = new RenderContext()

      const jse = new ExportAllDeclaration(ast)
      inspect(jse.toESString(ctx)).isEql(
        'export * from \'banana\';'
      )
    })
  })
})
