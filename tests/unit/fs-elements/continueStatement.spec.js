const inspect = require('inspect.js')
const ContinueStatement = require('../../../src/fs-elements/ContinueStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ContinueStatement', () => {
    it('renders a ContinueStatement element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ContinueStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'continue;'
      )
    })
  })
})
