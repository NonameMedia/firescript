const inspect = require('inspect.js')
const DoWhileStatement = require('../../../src/js-elements/DoWhileStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('DoWhileStatement', () => {
    it('renders a DoWhileStatement element', () => {
      const ast = require('../../fixtures/ast/doWhileStatement.json')
      const ctx = new RenderContext()

      const jse = new DoWhileStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'do {\n' +
        '  i += 1;\n' +
        '} while (i < 100);'
      )
    })
  })
})
