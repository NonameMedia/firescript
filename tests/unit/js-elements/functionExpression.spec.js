const inspect = require('inspect.js')
const FunctionExpression = require('../../../src/js-elements/FunctionExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('FunctionExpression', () => {
    it('renders a FunctionExpression element', () => {
      const ast = require('../../fixtures/ast/functionExpression.json')
      const ctx = new RenderContext()

      const jse = new FunctionExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'function getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })

    it('renders a FunctionExpression element of an async function', () => {
      const ast = require('../../fixtures/ast/asyncFunctionExpression.json')
      const ctx = new RenderContext()

      const jse = new FunctionExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'async function getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })

    it('renders a FunctionExpression element of a generator function', () => {
      const ast = require('../../fixtures/ast/generatorFunctionExpression.json')
      const ctx = new RenderContext()

      const jse = new FunctionExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'function * getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })
  })
})
