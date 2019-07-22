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

    it('transform into a commonjs prototype style extended class', () => {
      const ast = require('../../fixtures/jst/class-declaration-extends/ast.json')
      const jst = require('../../fixtures/jst/class-declaration-extends/jst.json')
      const transformated = transformer.transform(ast)
      inspect(transformated).isEql(jst)
    })

    it('transform into a commonjs prototype style class with getter and setter', () => {
      const ast = require('../../fixtures/jst/class-declaration-getset/ast.json')
      const jst = require('../../fixtures/jst/class-declaration-getset/jst.json')
      const transformated = transformer.transform(ast)
      inspect(transformated).isEql(jst)
    })
  })
})
