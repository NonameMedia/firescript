const inspect = require('inspect.js')
const ArrayExpression = require('../../../src/fs-elements/ArrayExpression')
const RenderContext = require('../../../src/RenderContext')

describe('FireScriptElements', () => {
  describe('ArrayExpression', () => {
    it('renders a ArrayExpression element', () => {
      const ast = require('../../fixtures/ast/arrayExpression.json')
      const ctx = new RenderContext()

      const jse = new ArrayExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        '[ \'banana\', \'mango\' ]'
      )
    })
  })
})
