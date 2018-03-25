const inspect = require('inspect.js')
const ImportDeclaration = require('../../../src/js-elements/ImportDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ImportDeclaration', () => {
    it('renders a ImportNamespaceSpecifier element', () => {
      const ast = require('../../fixtures/ast/importNamespaceSpecifier.json')
      const ctx = new RenderContext()

      const jse = new ImportDeclaration(ast)
      inspect(jse.toESString(ctx)).isEql(
        'import * as foo from \'foo\';'
      )
    })
  })
})
