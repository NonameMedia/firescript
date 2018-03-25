const inspect = require('inspect.js')
const ExportSpecifier = require('../../../src/js-elements/ExportSpecifier')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ExportSpecifier', () => {
    it('renders a ExportSpecifier element', () => {
      const ast = require('../../fixtures/ast/exportSpecifier.json')
      const ctx = new RenderContext()

      const jse = new ExportSpecifier(ast)
      inspect(jse.toESString(ctx)).isEql(
        'banana as b1'
      )
    })
  })
})
