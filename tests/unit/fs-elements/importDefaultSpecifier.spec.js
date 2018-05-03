const inspect = require('inspect.js')
const ImportDeclaration = require('../../../src/fs-elements/ImportDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ImportDeclaration', () => {
    it('renders a ImportDefaultSpecifier element', () => {
      const ast = require('../../fixtures/ast/importDefaultSpecifier.json')
      const ctx = new RenderContext({
        esModules: true
      })

      const jse = new ImportDeclaration(ast)

      inspect(jse.toFSString(ctx)).isEql(
        'import foo from \'foo\';'
      )
    })
  })
})
