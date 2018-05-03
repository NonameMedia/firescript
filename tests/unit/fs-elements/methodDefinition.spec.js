const inspect = require('inspect.js')
const MethodDefinition = require('../../../src/fs-elements/MethodDefinition')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('MethodDefinition', () => {
    it('renders a MethodDefinition element', () => {
      const ast = require('../../fixtures/ast/methodDefinition.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new MethodDefinition(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'getFruit () {\n' +
        '  return this.fruit;\n' +
        '}'
      )
    })
  })
})
