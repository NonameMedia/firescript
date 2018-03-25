const inspect = require('inspect.js')
const ExportNamedDeclaration = require('../../../src/js-elements/ExportNamedDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ExportNamedDeclaration', () => {
    it('renders a ExportNamedDeclaration element', () => {
      const ast = require('../../fixtures/ast/exportNamedDeclaration.json')
      const ctx = new RenderContext()

      const jse = new ExportNamedDeclaration(ast)
      inspect(jse.toESString(ctx)).isEql(
        'export { banana as b1 };'
      )
    })
  })
})
