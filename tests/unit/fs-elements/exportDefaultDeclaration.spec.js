const inspect = require('inspect.js')
const ExportDefaultDeclaration = require('../../../src/fs-elements/ExportDefaultDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ExportDefaultDeclaration', () => {
    it('renders a ExportDefaultDeclaration element', () => {
      const ast = require('../../fixtures/ast/exportDefaultDeclaration.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ExportDefaultDeclaration(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'export default banana;'
      )
    })
  })
})
