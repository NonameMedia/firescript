const inspect = require('inspect.js')
const CatchClause = require('../../../src/fs-elements/CatchClause')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('CatchClause', () => {
    it('renders a CatchClause element', () => {
      const ast = require('../../fixtures/ast/catchClause.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new CatchClause(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'catch (err) {\n' +
        '  throw err\n' +
        '}'
      )
    })
  })
})
