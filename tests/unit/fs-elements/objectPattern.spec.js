const inspect = require('inspect.js')
const ObjectPattern = require('../../../src/fs-elements/ObjectPattern')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ObjectPattern', () => {
    it('renders a ObjectPattern element', () => {
      const ast = require('../../fixtures/ast/objectPattern.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ObjectPattern(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '{ one, two }'
      )
    })
  })
})
