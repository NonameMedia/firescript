const inspect = require('inspect.js')
const ExpressionStatement = require('../../../src/js-elements/ExpressionStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ExpressionStatement', () => {
    it('renders a ExpressionStatement element', () => {
      const ast = require('../../fixtures/ast/expressionStatement.json')
      const ctx = new RenderContext()

      const jse = new ExpressionStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'await banana;'
      )
    })
  })
})
