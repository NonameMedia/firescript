const inspect = require('inspect.js')
const WhileStatement = require('../../../src/fs-elements/WhileStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('WhileStatement', () => {
    it('renders a WhileStatement element', () => {
      const ast = require('../../fixtures/ast/whileStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new WhileStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'while (i < 100) {\n' +
        '  i += 1;\n' +
        '  console.log(i);\n' +
        '}'
      )
    })
  })
})
