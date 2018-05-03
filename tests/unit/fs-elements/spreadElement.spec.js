const inspect = require('inspect.js')
const SpreadElement = require('../../../src/fs-elements/SpreadElement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('SpreadElement', () => {
    it('renders a SpreadElement element', () => {
      const ast = require('../../fixtures/ast/spreadElement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new SpreadElement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '...args'
      )
    })
  })
})
