const inspect = require('inspect.js')
const FunctionExpression = require('../../../src/fs-elements/FunctionExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('FunctionExpression', () => {
    it('renders a FunctionExpression element', () => {
      const ast = require('../../fixtures/ast/functionExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new FunctionExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'function getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })

    it('renders a FunctionExpression element of an async function', () => {
      const ast = require('../../fixtures/ast/asyncFunctionExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new FunctionExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'async function getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })

    it('renders a FunctionExpression element of a generator function', () => {
      const ast = require('../../fixtures/ast/generatorFunctionExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new FunctionExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'function * getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })
  })
})
