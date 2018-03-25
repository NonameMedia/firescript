const inspect = require('inspect.js')
const ForOfStatement = require('../../../src/js-elements/ForOfStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ForOfStatement', () => {
    it('renders a ForOfStatement element', () => {
      const ast = require('../../fixtures/ast/forOfStatement.json')
      const ctx = new RenderContext()

      const jse = new ForOfStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'for (const val of arr) {\n' +
        '  console.log(val);\n' +
        '}'
      )
    })
  })
})
