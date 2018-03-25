const inspect = require('inspect.js')
const ObjectPattern = require('../../../src/js-elements/ObjectPattern')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ObjectPattern', () => {
    it('renders a ObjectPattern element', () => {
      const ast = require('../../fixtures/ast/objectPattern.json')
      const ctx = new RenderContext()

      const jse = new ObjectPattern(ast)
      inspect(jse.toESString(ctx)).isEql(
        '{ one, two }'
      )
    })
  })
})
