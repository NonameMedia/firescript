const inspect = require('inspect.js')
const TryStatement = require('../../../src/fs-elements/TryStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('TryStatement', () => {
    it('renders a TryStatement element', () => {
      const ast = require('../../fixtures/ast/tryStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new TryStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'try {\n' +
        '  banana();\n' +
        '} catch (err) {\n' +
        '  throw err\n' +
        '}'
      )
    })
  })
})
