const inspect = require('inspect.js')
const Literal = require('../../../src/fs-elements/Literal')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('Literal', () => {
    it('renders a Literal element', () => {
      const ast = {
        type: 'Literal',
        raw: '"banana"',
        value: 'banana'
      }
      const ctx = new RenderContext(null, 'fire')

      const jse = new Literal(ast)
      inspect(jse.toFSString(ctx)).isEql('\'banana\'')
    })
  })
})
