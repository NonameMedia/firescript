const inspect = require('inspect.js')
const DoWhileStatement = require('../../../src/fs-elements/DoWhileStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('DoWhileStatement', () => {
    it('renders a DoWhileStatement element', () => {
      const ast = require('../../fixtures/ast/doWhileStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new DoWhileStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'do {\n' +
        '  i += 1;\n' +
        '} while (i < 100);'
      )
    })
  })
})
