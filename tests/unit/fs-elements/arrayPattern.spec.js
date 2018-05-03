const inspect = require('inspect.js')
const ArrayPattern = require('../../../src/fs-elements/ArrayPattern')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ArrayPattern', () => {
    it('renders a ArrayPattern element', () => {
      const ast = require('../../fixtures/ast/arrayPattern.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ArrayPattern(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '[ one, two, three ]'
      )
    })
  })
})
