const inspect = require('inspect.js')
const SwitchStatement = require('../../../src/js-elements/SwitchStatement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('SwitchStatement', () => {
    it('renders a SwitchStatement element', () => {
      const ast = require('../../fixtures/ast/switchStatement.json')
      const ctx = new RenderContext()

      const jse = new SwitchStatement(ast)
      inspect(jse.toESString(ctx)).isEql(
        'switch (true) {\n' +
        '  case obj:\n' +
        '    one();\n' +
        '    break;\n' +
        '\n' +
        '  default:\n' +
        '    zero();\n' +
        '}'
      )
    })
  })
})
