const inspect = require('inspect.js')
const CatchClause = require('../../../src/js-elements/CatchClause')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('CatchClause', () => {
    it('renders a CatchClause element', () => {
      const ast = require('../../fixtures/ast/catchClause.json')
      const ctx = new RenderContext()

      const jse = new CatchClause(ast)
      inspect(jse.toESString(ctx)).isEql(
        'catch (err) {\n' +
        '  throw err\n' +
        '}'
      )
    })
  })
})
