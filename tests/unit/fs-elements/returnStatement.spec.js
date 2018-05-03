const inspect = require('inspect.js')
const ReturnStatement = require('../../../src/fs-elements/ReturnStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ReturnStatement', () => {
    it('renders a ReturnStatement element', () => {
      const ast = require('../../fixtures/ast/returnStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ReturnStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'return banana;'
      )
    })
  })
})
