const inspect = require('inspect.js')
const MemberExpression = require('../../../src/js-elements/MemberExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('MemberExpression', () => {
    it('renders a MemberExpression element', () => {
      const ast = require('../../fixtures/ast/memberExpression.json')
      const ctx = new RenderContext()

      const jse = new MemberExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'console.log'
      )
    })
  })
})
