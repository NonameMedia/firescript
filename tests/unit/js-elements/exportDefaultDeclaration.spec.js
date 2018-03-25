const inspect = require('inspect.js')
const ExportDefaultDeclaration = require('../../../src/js-elements/ExportDefaultDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ExportDefaultDeclaration', () => {
    it('renders a ExportDefaultDeclaration element', () => {
      const ast = require('../../fixtures/ast/exportDefaultDeclaration.json')
      const ctx = new RenderContext()

      const jse = new ExportDefaultDeclaration(ast)
      inspect(jse.toESString(ctx)).isEql(
        'export default banana;'
      )
    })
  })
})
