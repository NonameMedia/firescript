const inspect = require('inspect.js')
const ASTTransformer = require('../../../src/ASTTransformer')

describe('Transform', () => {
  let transformer

  before(() => {
    transformer = new ASTTransformer({
      esClasses: false
    })

    transformer.load('js-transformations')
  })

  describe('ClassDeclaration', () => {
    it('transform into a commonjs prototype style class', () => {
      const ast = require('../../fixtures/jst/class-declaration/ast.json')
      const jst = require('../../fixtures/jst/class-declaration/jst.json')
      const transformated = transformer.transform(ast)
      inspect(transformated).isEql(jst)
    })
  })
})
