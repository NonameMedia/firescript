const inspect = require('inspect.js')
const ClassExpression = require('../../../src/fs-elements/ClassExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ClassExpression', () => {
    it('renders a ClassExpression element', () => {
      const ast = require('../../fixtures/ast/classExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ClassExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'class Banana {\n' +
        '  constructor () {\n' +
        '    this.fruit = \'banana\';\n' +
        '  }\n' +
        '}'
      )
    })
  })
})
