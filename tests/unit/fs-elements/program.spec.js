const inspect = require('inspect.js')
const Program = require('../../../src/fs-elements/Program')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('Program', () => {
    it('renders a Program element', () => {
      const ast = require('../../fixtures/ast/program.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new Program(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'banana();\n' +
        'mango();\n'
      )
    })
  })
})
