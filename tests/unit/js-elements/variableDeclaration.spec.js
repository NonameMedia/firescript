const inspect = require('inspect.js')
const VariableDeclaration = require('../../../src/js-elements/VariableDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('VariableDeclaration', () => {
    it('renders a VariableDeclaration element', () => {
      const ast = require('../../fixtures/ast/variableDeclaration.json')
      const ctx = new RenderContext()
      const jse = new VariableDeclaration(ast)
      inspect(jse.toESString(ctx)).isEql(
        'const res = \'bla\''
      )
    })
  })
})
