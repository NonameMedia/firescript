const inspect = require('inspect.js')
const SwitchStatement = require('../../../src/fs-elements/SwitchStatement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('SwitchStatement', () => {
    it('renders a SwitchStatement element', () => {
      const ast = require('../../fixtures/ast/switchStatement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new SwitchStatement(ast)
      inspect(jse.toFSString(ctx)).isEql(
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
