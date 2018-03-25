const inspect = require('inspect.js')
const MetaProperty = require('../../../src/js-elements/MetaProperty')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('MetaProperty', () => {
    it('renders a MetaProperty element', () => {
      const ast = require('../../fixtures/ast/metaProperty.json')
      const ctx = new RenderContext()

      const jse = new MetaProperty(ast)
      inspect(jse.toESString(ctx)).isEql(
        'new.target'
      )
    })
  })
})
