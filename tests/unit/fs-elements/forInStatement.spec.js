const inspect = require('inspect.js')
const ForInStatement = require('../../../src/fs-elements/ForInStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ForInStatement', () => {
    it('renders a ForInStatement element', () => {
      const ast = require('../../fixtures/ast/forInStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ForInStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'for (const key in obj) {\n' +
        '  console.log(key);\n' +
        '}'
      )
    })
  })
})
