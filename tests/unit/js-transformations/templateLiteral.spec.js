const inspect = require('inspect.js')
const ASTTransformer = require('../../../src/ASTTransformer')

describe('Transform', () => {
  let transformer

  before(() => {
    transformer = new ASTTransformer({
      esTemplates: false
    })

    transformer.load('js-transformations')
  })

  describe('TemplateLiteral', () => {
    it('transform a template literal', () => {
      const ast = require('../../fixtures/jst/template-literal/ast.json')
      const jst = require('../../fixtures/jst/template-literal/jst.json')
      const transformated = transformer.transform(ast)
      inspect(transformated).isEql(jst)
    })
  })
})
