const inspect = require('inspect.js')
const ForStatement = require('../../../src/js-elements/ForStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ForStatement', () => {
    it('renders a ForStatement element', () => {
      const ast = require('../../fixtures/ast/forStatement.json')
      const ctx = new RenderContext()

      const jse = new ForStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'for (var i = 0; i < 100; i++) {\n' +
        '  console.log(i);\n' +
        '}'
      )
    })
  })
})
