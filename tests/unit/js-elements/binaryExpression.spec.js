const inspect = require('inspect.js')
const BinaryExpression = require('../../../src/js-elements/BinaryExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('BinaryExpression', () => {
    it('renders a BinaryExpression element', () => {
      const ast = require('../../fixtures/ast/binaryExpression.json')
      const ctx = new RenderContext()

      const jse = new BinaryExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'num >= 100'
      )
    })
  })
})
