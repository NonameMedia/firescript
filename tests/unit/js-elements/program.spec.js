const inspect = require('inspect.js')
const Program = require('../../../src/js-elements/Program')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('Program', () => {
    it('renders a Program element', () => {
      const ast = require('../../fixtures/ast/program.json')
      const ctx = new RenderContext()

      const jse = new Program(ast)
      inspect(jse.toESString(ctx)).isEql(
        'banana();\n' +
        'mango();\n'
      )
    })
  })
})
