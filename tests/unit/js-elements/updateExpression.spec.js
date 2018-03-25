const inspect = require('inspect.js')
const UpdateExpression = require('../../../src/js-elements/UpdateExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('UpdateExpression', () => {
    it('renders a UpdateExpression element', () => {
      const ast = require('../../fixtures/ast/updateExpression.json')
      const ctx = new RenderContext()

      const jse = new UpdateExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'i++'
      )
    })
  })
})
