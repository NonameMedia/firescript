const inspect = require('inspect.js')
const Property = require('../../../src/fs-elements/Property')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('Property', () => {
    it('renders a Property element', () => {
      const ast = require('../../fixtures/ast/property.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new Property(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'banana: \'Banana\''
      )
    })

    it('renders a Property element of type method', () => {
      const ast = require('../../fixtures/ast/propertyMethod.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new Property(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'getFruits () {\n' +
        '  return this;\n' +
        '}'
      )
    })
  })
})
