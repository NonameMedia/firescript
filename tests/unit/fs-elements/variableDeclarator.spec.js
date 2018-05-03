const inspect = require('inspect.js')
const VariableDeclarator = require('../../../src/fs-elements/VariableDeclarator')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('VariableDeclarator', () => {
    it('renders a VariableDeclarator element', () => {
      const ast = require('../../fixtures/ast/variableDeclarator.json')
      const ctx = new RenderContext(null, 'fire')
      const jse = new VariableDeclarator(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'res = \'bla\''
      )
    })
  })
})
