const inspect = require('inspect.js')
const ThisExpression = require('../../../src/js-elements/ThisExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ThisExpression', () => {
    it('renders a ThisExpression element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext()

      const jse = new ThisExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'this'
      )
    })
  })
})
