const inspect = require('inspect.js')
const ExportNamedDeclaration = require('../../../src/fs-elements/ExportNamedDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ExportNamedDeclaration', () => {
    it('renders a ExportNamedDeclaration element', () => {
      const ast = require('../../fixtures/ast/exportNamedDeclaration.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ExportNamedDeclaration(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'export { banana as b1 };'
      )
    })
  })
})
