const inspect = require('inspect.js')
const VariableDeclarator = require('../../../src/js-elements/VariableDeclarator')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('VariableDeclarator', () => {
    it('renders a VariableDeclarator element', () => {
      const ast = require('../../fixtures/ast/variableDeclarator.json')
      const ctx = new RenderContext()
      const jse = new VariableDeclarator(ast)
      inspect(jse.toESString(ctx)).isEql(
        'res = \'bla\''
      )
    })
  })
})
