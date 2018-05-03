const inspect = require('inspect.js')
const Super = require('../../../src/fs-elements/Super')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('Super', () => {
    it('renders a Super element', () => {
      const ast = require('../../fixtures/ast/super.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new Super(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'super'
      )
    })
  })
})
