const inspect = require('inspect.js')
const ForInStatement = require('../../../src/js-elements/ForInStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ForInStatement', () => {
    it('renders a ForInStatement element', () => {
      const ast = require('../../fixtures/ast/forInStatement.json')
      const ctx = new RenderContext()

      const jse = new ForInStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'for (const key in obj) {\n' +
        '  console.log(key);\n' +
        '}'
      )
    })
  })
})
