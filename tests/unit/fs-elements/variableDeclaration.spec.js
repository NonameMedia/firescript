const inspect = require('inspect.js')
const VariableDeclaration = require('../../../src/fs-elements/VariableDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('VariableDeclaration', () => {
    it('renders a VariableDeclaration element', () => {
      const ast = require('../../fixtures/ast/variableDeclaration.json')
      const ctx = new RenderContext(null, 'fire')
      const jse = new VariableDeclaration(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'const res = \'bla\';'
      )
    })
  })
})
