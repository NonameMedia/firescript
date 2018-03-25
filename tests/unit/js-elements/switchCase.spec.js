const inspect = require('inspect.js')
const SwitchCase = require('../../../src/js-elements/SwitchCase')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('SwitchCase', () => {
    it('renders a SwitchCase element', () => {
      const ast = require('../../fixtures/ast/switchCase.json')
      const ctx = new RenderContext()

      const jse = new SwitchCase(ast)
      inspect(jse.toESString(ctx)).isEql(
        'case obj:\n' +
        '  one();\n' +
        '  break;'
      )
    })
  })
})
