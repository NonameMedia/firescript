const inspect = require('inspect.js')
const ContinueStatement = require('../../../src/js-elements/ContinueStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ContinueStatement', () => {
    it('renders a ContinueStatement element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext()

      const jse = new ContinueStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'continue;'
      )
    })
  })
})
