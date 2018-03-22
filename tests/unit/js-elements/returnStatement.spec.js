const inspect = require('inspect.js')
const ReturnStatement = require('../../../src/js-elements/ReturnStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ReturnStatement', () => {
    it('renders a ReturnStatement element', () => {
      const ast = require('../../fixtures/ast/returnStatement.json')
      const ctx = new RenderContext()

      const jse = new ReturnStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'return banana;'
      )
    })
  })
})
