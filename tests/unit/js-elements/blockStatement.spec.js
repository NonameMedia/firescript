const inspect = require('inspect.js')
const BlockStatement = require('../../../src/js-elements/BlockStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('BlockStatement', () => {
    it('renders a BlockStatement element', () => {
      const ast = require('../../fixtures/ast/blockStatement.json')
      const ctx = new RenderContext()

      const jse = new BlockStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        '{\n' +
        '  banana();\n' +
        '  mango();\n' +
        '}'
      )
    })
  })
})
