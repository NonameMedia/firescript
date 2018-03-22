const inspect = require('inspect.js')
const DebuggerStatement = require('../../../src/js-elements/DebuggerStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('DebuggerStatement', () => {
    it('renders a DebuggerStatement element', () => {
      const ast = require('../../fixtures/ast/thisExpression.json')
      const ctx = new RenderContext()

      const jse = new DebuggerStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'debugger;'
      )
    })
  })
})
