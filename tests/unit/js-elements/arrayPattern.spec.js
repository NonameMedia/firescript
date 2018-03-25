const inspect = require('inspect.js')
const ArrayPattern = require('../../../src/js-elements/ArrayPattern')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ArrayPattern', () => {
    it('renders a ArrayPattern element', () => {
      const ast = require('../../fixtures/ast/arrayPattern.json')
      const ctx = new RenderContext()

      const jse = new ArrayPattern(ast)
      inspect(jse.toESString(ctx)).isEql(
        '[ one, two, three ]'
      )
    })
  })
})
