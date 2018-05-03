const inspect = require('inspect.js')
const MetaProperty = require('../../../src/fs-elements/MetaProperty')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('MetaProperty', () => {
    it('renders a MetaProperty element', () => {
      const ast = require('../../fixtures/ast/metaProperty.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new MetaProperty(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'new.target'
      )
    })
  })
})
