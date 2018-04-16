const inspect = require('inspect.js')

const ASTTransformer = require('../../src/ASTTransformer')

describe.only('ASTTransformer', () => {
  describe('transform()', () => {
    it('triggers a transformation method', () => {
      const transformer = new ASTTransformer()

      transformer.add('Identifier', (ast) => {
        return {
          type: 'Xidentifier',
          name: ast.name
        }
      })

      const ast = transformer.transform({
        type: 'Program',
        body: [{
          type: 'Identifier',
          name: 'banana'
        }]
      })

      inspect(ast).isEql({
        type: 'Program',
        body: [{
          type: 'Xidentifier',
          name: 'banana'
        }]
      })
    })
  })
})
