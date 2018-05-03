const inspect = require('inspect.js')
const RestElement = require('../../../src/fs-elements/RestElement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('RestElement', () => {
    it('renders a RestElement element', () => {
      const ast = require('../../fixtures/ast/restElement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new RestElement(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '...args'
      )
    })
  })
})
