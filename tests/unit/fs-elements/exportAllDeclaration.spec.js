const inspect = require('inspect.js')
const ExportAllDeclaration = require('../../../src/fs-elements/ExportAllDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ExportAllDeclaration', () => {
    it('renders a ExportAllDeclaration element', () => {
      const ast = require('../../fixtures/ast/exportAllDeclaration.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ExportAllDeclaration(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'export * from \'banana\';'
      )
    })
  })
})
