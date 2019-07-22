const inspect = require('inspect.js')
const ASTTransformer = require('../../../src/ASTTransformer')

describe('Transform', () => {
  let transformer

  before(() => {
    transformer = new ASTTransformer({})
    transformer.load('js-transformations')
  })

  describe('FirescriptLogStatement', () => {
    it('transform a log statement', () => {
      const ast = require('../../fixtures/jst/log-statement/ast.json')
      const jst = require('../../fixtures/jst/log-statement/jst.json')
      const transformated = transformer.transform(ast)
      inspect(transformated).isEql(jst)
    })
  })
})
