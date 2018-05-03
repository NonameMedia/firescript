const inspect = require('inspect.js')
const ThisExpression = require('../../../src/fs-elements/ThisExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ThisExpression', () => {
    it('renders a ThisExpression element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ThisExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'this'
      )
    })
  })
})
