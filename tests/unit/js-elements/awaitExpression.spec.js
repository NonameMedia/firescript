const inspect = require('inspect.js')
const AwaitExpression = require('../../../src/js-elements/AwaitExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('AwaitExpression', () => {
    it('renders a AwaitExpression element', () => {
      const ast = require('../../fixtures/ast/awaitExpression.json')
      const ctx = new RenderContext()

      const jse = new AwaitExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'await banana'
      )
    })
  })
})
