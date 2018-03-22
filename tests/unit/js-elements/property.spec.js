const inspect = require('inspect.js')
const Property = require('../../../src/js-elements/Property')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('Property', () => {
    it('renders a Property element', () => {
      const ast = require('../../fixtures/ast/property.json')
      const ctx = new RenderContext()

      const jse = new Property(ast)
      inspect(jse.toESString(ctx)).isEql(
        'banana: \'Banana\''
      )
    })

    it('renders a Property element of type method', () => {
      const ast = require('../../fixtures/ast/propertyMethod.json')
      const ctx = new RenderContext()

      const jse = new Property(ast)
      inspect(jse.toESString(ctx)).isEql(
        'getFruits () {\n' +
        '  return this;\n' +
        '}'
      )
    })
  })
})
