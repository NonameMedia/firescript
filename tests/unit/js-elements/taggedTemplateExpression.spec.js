const inspect = require('inspect.js')
const TaggedTemplateExpression = require('../../../src/js-elements/TaggedTemplateExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('TaggedTemplateExpression', () => {
    it('renders a TaggedTemplateExpression element', () => {
      const ast = require('../../fixtures/ast/taggedTemplateExpression.json')
      const ctx = new RenderContext()

      const jse = new TaggedTemplateExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'tmpl `Hello ${name}`'
      )
    })
  })
})
