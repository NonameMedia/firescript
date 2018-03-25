const inspect = require('inspect.js')
const RestElement = require('../../../src/js-elements/RestElement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('RestElement', () => {
    it('renders a RestElement element', () => {
      const ast = require('../../fixtures/ast/restElement.json')
      const ctx = new RenderContext()

      const jse = new RestElement(ast)
      inspect(jse.toESString(ctx)).isEql(
        '...args'
      )
    })
  })
})
