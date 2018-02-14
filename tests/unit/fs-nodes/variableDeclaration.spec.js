const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const VariableDeclaration = require('../../../src/fs-nodes/VariableDeclaration')

describe('VariableDeclaration', () => {
  describe('instance', () => {
    it('returns a arrow function expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'const' },
        { type: 'identifier', value: 'res' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '\'bla\'' }
      ])

      const node = new VariableDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('VariableDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [{
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: 'res'
          },
          init: {
            type: 'Literal',
            raw: '\'bla\'',
            value: 'bla'
          }
        }]
      })
    })
  })
})
