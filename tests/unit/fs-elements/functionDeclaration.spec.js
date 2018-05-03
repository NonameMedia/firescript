const inspect = require('inspect.js')
const FunctionDeclaration = require('../../../src/fs-elements/FunctionDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('FunctionDeclaration', () => {
    it('renders a FunctionDeclaration element', () => {
      const ast = require('../../fixtures/ast/functionExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new FunctionDeclaration(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'function getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })

    it('renders a FunctionDeclaration element of an async function', () => {
      const ast = require('../../fixtures/ast/asyncFunctionDeclaration.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new FunctionDeclaration(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'async function getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })

    it('renders a FunctionDeclaration element of a generator function', () => {
      const ast = require('../../fixtures/ast/generatorFunctionDeclaration.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new FunctionDeclaration(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'function * getFruits (banana) {\n' +
        '  return banana;\n' +
        '}'
      )
    })
  })
})
