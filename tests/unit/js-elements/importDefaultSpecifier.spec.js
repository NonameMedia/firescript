const inspect = require('inspect.js')
const ImportDeclaration = require('../../../src/js-elements/ImportDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ImportDeclaration', () => {
    it('renders a ImportDefaultSpecifier element', () => {
      const ast = require('../../fixtures/ast/importDefaultSpecifier.json')
      const ctx = new RenderContext({
        esModules: true
      })

      const jse = new ImportDeclaration(ast)

      inspect(jse.toESString(ctx)).isEql(
        'import foo from \'foo\';'
      )
    })
  })
})
