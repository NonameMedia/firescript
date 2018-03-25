const inspect = require('inspect.js')
const ClassExpression = require('../../../src/js-elements/ClassExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('ClassExpression', () => {
    it('renders a ClassExpression element', () => {
      const ast = require('../../fixtures/ast/classExpression.json')
      const ctx = new RenderContext()

      const jse = new ClassExpression(ast)
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
