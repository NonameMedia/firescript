const inspect = require('inspect.js')
const Super = require('../../../src/js-elements/Super')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('Super', () => {
    it('renders a Super element', () => {
      const ast = require('../../fixtures/ast/super.json')
      const ctx = new RenderContext()

      const jse = new Super(ast)
      inspect(jse.toESString(ctx)).isEql(
        'super'
      )
    })
  })
})
