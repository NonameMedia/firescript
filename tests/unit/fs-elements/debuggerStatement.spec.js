const inspect = require('inspect.js')
const DebuggerStatement = require('../../../src/fs-elements/DebuggerStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('DebuggerStatement', () => {
    it('renders a DebuggerStatement element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new DebuggerStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'debugger;'
      )
    })
  })
})
