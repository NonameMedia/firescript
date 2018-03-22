const inspect = require('inspect.js')
const Identifier = require('../../../src/js-elements/Identifier')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('Identifier', () => {
    it('renders a Identifier element', () => {
      const ast = {
        type: 'Identifier',
        name: 'banana'
      }
      const ctx = new RenderContext()

      const jse = new Identifier(ast)
      inspect(jse.toESString(ctx)).isEql('banana')
    })
  })
})
