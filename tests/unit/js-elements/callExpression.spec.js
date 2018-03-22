const inspect = require('inspect.js')
const CallExpression = require('../../../src/js-elements/CallExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('CallExpression', () => {
    it('renders a CallExpression element', () => {
      const ast = require('../../fixtures/ast/callExpression.json')
      const ctx = new RenderContext()

      const jse = new CallExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'banana()'
      )
    })

    it('renders a CallExpression element with one argument', () => {
      const ast = require('../../fixtures/ast/callExpressionWithArg.json')
      const ctx = new RenderContext()

      const jse = new CallExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'banana(\'yellow\')'
      )
    })

    it('renders a CallExpression element with two arguments', () => {
      const ast = require('../../fixtures/ast/callExpressionWithTwoArgs.json')
      const ctx = new RenderContext()

      const jse = new CallExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'banana(\'yellow\', \'fruit\')'
      )
    })
  })
})
