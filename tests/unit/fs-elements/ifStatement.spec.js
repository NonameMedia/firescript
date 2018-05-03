const inspect = require('inspect.js')
const IfStatement = require('../../../src/fs-elements/IfStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('IfStatement', () => {
    it('renders a IfStatement element', () => {
      const ast = require('../../fixtures/ast/ifStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new IfStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'if (foo) {\n' +
        '  console.log(foo);\n' +
        '}'
      )
    })
  })
})
