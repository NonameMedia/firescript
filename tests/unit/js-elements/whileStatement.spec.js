const inspect = require('inspect.js')
const WhileStatement = require('../../../src/js-elements/WhileStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('WhileStatement', () => {
    it('renders a WhileStatement element', () => {
      const ast = require('../../fixtures/ast/whileStatement.json')
      const ctx = new RenderContext()

      const jse = new WhileStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'while (i < 100) {\n' +
        '  i += 1;\n' +
        '  console.log(i);\n' +
        '}'
      )
    })
  })
})
