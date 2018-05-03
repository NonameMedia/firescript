const inspect = require('inspect.js')
const Identifier = require('../../../src/fs-elements/Identifier')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('Identifier', () => {
    it('renders a Identifier element', () => {
      const ast = {
        type: 'Identifier',
        name: 'banana'
      }
      const ctx = new RenderContext(null, 'fire')

      const jse = new Identifier(ast)
      inspect(jse.toFSString(ctx)).isEql('banana')
    })
  })
})
