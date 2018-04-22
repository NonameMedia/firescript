const inspect = require('inspect.js')
const ASTTransformer = require('../../../src/ASTTransformer')

describe('Transform', () => {
  let transformer

  before(() => {
    transformer = new ASTTransformer({
      esModules: false
    })

    transformer.load('js-transformations')
  })

  describe('ImportDeclaration', () => {
    it('transform into a commonjs module import', () => {
      const ast = require('../../fixtures/jst/import-declaration/ast.json')
      const jst = require('../../fixtures/jst/import-declaration/jst.json')
      const transformated = transformer.transform(ast)
      inspect(transformated).isEql(jst)
    })
  })
})
