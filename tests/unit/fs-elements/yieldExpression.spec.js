const inspect = require('inspect.js')
const YieldExpression = require('../../../src/fs-elements/YieldExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('YieldExpression', () => {
    it('renders a YieldExpression element', () => {
      const ast = require('../../fixtures/ast/yieldExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new YieldExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'yield banana'
      )
    })
  })
})
