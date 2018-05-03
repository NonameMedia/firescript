const inspect = require('inspect.js')
const ClassDeclaration = require('../../../src/fs-elements/ClassDeclaration')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ClassDeclaration', () => {
    it('renders a ClassDeclaration element', () => {
      const ast = require('../../fixtures/ast/classExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ClassDeclaration(ast)
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
