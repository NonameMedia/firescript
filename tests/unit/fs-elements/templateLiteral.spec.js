const inspect = require('inspect.js')
const TemplateLiteral = require('../../../src/fs-elements/TemplateLiteral')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('TemplateLiteral', () => {
    it('renders a TemplateLiteral element', () => {
      const ast = require('../../fixtures/ast/templateLiteral.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new TemplateLiteral(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '`Hello ${name}`'
      )
    })
  })
})
