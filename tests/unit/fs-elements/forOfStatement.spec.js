const inspect = require('inspect.js')
const ForOfStatement = require('../../../src/fs-elements/ForOfStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ForOfStatement', () => {
    it('renders a ForOfStatement element', () => {
      const ast = require('../../fixtures/ast/forOfStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ForOfStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'for (const val of arr) {\n' +
        '  console.log(val);\n' +
        '}'
      )
    })
  })
})
