const inspect = require('inspect.js')
const YieldExpression = require('../../../src/js-elements/YieldExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('YieldExpression', () => {
    it('renders a YieldExpression element', () => {
      const ast = require('../../fixtures/ast/yieldExpression.json')
      const ctx = new RenderContext()

      const jse = new YieldExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'yield banana'
      )
    })
  })
})
