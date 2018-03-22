const inspect = require('inspect.js')
const Literal = require('../../../src/js-elements/Literal')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('Literal', () => {
    it('renders a Literal element', () => {
      const ast = {
        type: 'Literal',
        raw: '"banana"',
        value: 'banana'
      }
      const ctx = new RenderContext()

      const jse = new Literal(ast)
      inspect(jse.toESString(ctx)).isEql('\'banana\'')
    })
  })
})
