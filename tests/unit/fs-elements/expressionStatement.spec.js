const inspect = require('inspect.js')
const ExpressionStatement = require('../../../src/fs-elements/ExpressionStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ExpressionStatement', () => {
    it('renders a ExpressionStatement element', () => {
      const ast = require('../../fixtures/ast/expressionStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ExpressionStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'await banana;'
      )
    })
  })
})
