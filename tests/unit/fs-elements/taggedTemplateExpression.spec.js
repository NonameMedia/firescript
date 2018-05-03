const inspect = require('inspect.js')
const TaggedTemplateExpression = require('../../../src/fs-elements/TaggedTemplateExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('TaggedTemplateExpression', () => {
    it('renders a TaggedTemplateExpression element', () => {
      const ast = require('../../fixtures/ast/taggedTemplateExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new TaggedTemplateExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'tmpl `Hello ${name}`'
      )
    })
  })
})
