const inspect = require('inspect.js')
const MethodDefinition = require('../../../src/js-elements/MethodDefinition')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('MethodDefinition', () => {
    it('renders a MethodDefinition element', () => {
      const ast = require('../../fixtures/ast/methodDefinition.json')
      const ctx = new RenderContext()

      const jse = new MethodDefinition(ast)
      inspect(jse.toESString(ctx)).isEql(
        'getFruit () {\n' +
        '  return this.fruit;\n' +
        '}'
      )
    })
  })
})
