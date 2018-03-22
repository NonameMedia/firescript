const inspect = require('inspect.js')
const BreakStatement = require('../../../src/js-elements/BreakStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('BreakStatement', () => {
    it('renders a BreakStatement element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext()

      const jse = new BreakStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'break;'
      )
    })
  })
})
