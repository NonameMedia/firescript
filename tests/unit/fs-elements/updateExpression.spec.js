const inspect = require('inspect.js')
const UpdateExpression = require('../../../src/fs-elements/UpdateExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('UpdateExpression', () => {
    it('renders a UpdateExpression element', () => {
      const ast = require('../../fixtures/ast/updateExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new UpdateExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'i++'
      )
    })
  })
})
