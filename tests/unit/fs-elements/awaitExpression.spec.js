const inspect = require('inspect.js')
const AwaitExpression = require('../../../src/fs-elements/AwaitExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('AwaitExpression', () => {
    it('renders a AwaitExpression element', () => {
      const ast = require('../../fixtures/ast/awaitExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new AwaitExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'await banana'
      )
    })
  })
})
