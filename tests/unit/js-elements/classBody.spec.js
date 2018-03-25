const inspect = require('inspect.js')
const ClassBody = require('../../../src/js-elements/ClassBody')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ClassBody', () => {
    it('renders a ClassBody element', () => {
      const ast = require('../../fixtures/ast/classBody.json')
      const ctx = new RenderContext()

      const jse = new ClassBody(ast)
      inspect(jse.toESString(ctx)).isEql(
        '{\n' +
        '  constructor () {\n' +
        '    this.fruit = \'banana\';\n' +
        '  }\n\n' +
        '  getFruit () {\n' +
        '    return this.fruit;\n' +
        '  }\n' +
        '}'
      )
    })
  })
})
