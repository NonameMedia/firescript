const inspect = require('inspect.js')
const ClassBody = require('../../../src/fs-elements/ClassBody')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ClassBody', () => {
    it('renders a ClassBody element', () => {
      const ast = require('../../fixtures/ast/classBody.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ClassBody(ast)
      inspect(jse.toFSString(ctx)).isEql(
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
