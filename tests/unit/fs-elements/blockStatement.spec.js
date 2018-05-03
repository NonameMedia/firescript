const inspect = require('inspect.js')
const BlockStatement = require('../../../src/fs-elements/BlockStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('BlockStatement', () => {
    it('renders a BlockStatement element', () => {
      const ast = require('../../fixtures/ast/blockStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new BlockStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '{\n' +
        '  banana();\n' +
        '  mango();\n' +
        '}'
      )
    })
  })
})
