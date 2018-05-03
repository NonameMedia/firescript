const inspect = require('inspect.js')
const ExportSpecifier = require('../../../src/fs-elements/ExportSpecifier')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ExportSpecifier', () => {
    it('renders a ExportSpecifier element', () => {
      const ast = require('../../fixtures/ast/exportSpecifier.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ExportSpecifier(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'banana as b1'
      )
    })
  })
})
