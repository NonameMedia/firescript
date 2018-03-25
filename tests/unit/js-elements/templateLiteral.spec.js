const inspect = require('inspect.js')
const TemplateLiteral = require('../../../src/js-elements/TemplateLiteral')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('TemplateLiteral', () => {
    it('renders a TemplateLiteral element', () => {
      const ast = require('../../fixtures/ast/templateLiteral.json')
      const ctx = new RenderContext()

      const jse = new TemplateLiteral(ast)
      inspect(jse.toESString(ctx)).isEql(
        '`Hello ${name}`'
      )
    })
  })
})
