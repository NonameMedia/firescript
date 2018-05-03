const inspect = require('inspect.js')
const ForStatement = require('../../../src/fs-elements/ForStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ForStatement', () => {
    it('renders a ForStatement element', () => {
      const ast = require('../../fixtures/ast/forStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ForStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'for (var i = 0; i < 100; i++) {\n' +
        '  console.log(i);\n' +
        '}'
      )
    })
  })
})
