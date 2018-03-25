const inspect = require('inspect.js')
const SpreadElement = require('../../../src/js-elements/SpreadElement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('SpreadElement', () => {
    it('renders a SpreadElement element', () => {
      const ast = require('../../fixtures/ast/spreadElement.json')
      const ctx = new RenderContext()

      const jse = new SpreadElement(ast)
      inspect(jse.toESString(ctx)).isEql(
        '...args'
      )
    })
  })
})
