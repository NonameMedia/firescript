const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const ASTCreator = require('../../src/utils/ASTCreator')

describe('ASTCreator', () => {
  describe('importDeclaration()', () => {
    it('creates a import default specifier AST', () => {
      const ast = ASTCreator.importDeclaration([
        [ '**', 'banana' ]
      ], 'banana')

      inspect(ast).isEql({
        'type': 'ImportDeclaration',
        'specifiers': [
          {
            'type': 'ImportDefaultSpecifier',
            'local': {
              'type': 'Identifier',
              'name': 'banana'
            }
          }
        ],
        'source': {
          'type': 'Literal',
          'value': 'banana',
          'raw': "'banana'"
        }
      })
    })
  })
})
