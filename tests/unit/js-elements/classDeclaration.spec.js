const inspect = require('inspect.js')
const ClassDeclaration = require('../../../src/js-elements/ClassDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ClassDeclaration', () => {
    it('renders a ClassDeclaration element', () => {
      const ast = require('../../fixtures/ast/classExpression.json')
      const ctx = new RenderContext()

      const jse = new ClassDeclaration(ast)
      inspect(jse.toESString(ctx)).isEql(
        'class Banana {\n' +
        '  constructor () {\n' +
        '    this.fruit = \'banana\';\n' +
        '  }\n' +
        '}'
      )
    })
  })
})
