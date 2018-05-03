const inspect = require('inspect.js')
const BreakStatement = require('../../../src/fs-elements/BreakStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('BreakStatement', () => {
    it('renders a BreakStatement element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new BreakStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'break;'
      )
    })
  })
})
