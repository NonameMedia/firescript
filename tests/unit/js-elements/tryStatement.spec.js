const inspect = require('inspect.js')
const TryStatement = require('../../../src/js-elements/TryStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('TryStatement', () => {
    it('renders a TryStatement element', () => {
      const ast = require('../../fixtures/ast/tryStatement.json')
      const ctx = new RenderContext()

      const jse = new TryStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'try {\n' +
        '  banana();\n' +
        '} catch (err) {\n' +
        '  throw err\n' +
        '}'
      )
    })
  })
})
