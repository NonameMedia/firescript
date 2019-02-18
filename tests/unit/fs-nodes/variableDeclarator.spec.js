const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const VariableDeclarator = require('../../../src/fs-nodes/VariableDeclarator')

describe('VariableDeclarator', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a variable declarator node', () => {
      const tokenStack = new TokenStack([
        { type: 'identifier', value: 'res' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '\'bla\'' }
      ])

      const node = new VariableDeclarator(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('VariableDeclarator')
      inspect(node.toJSON(ctx)).isEql({
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'res'
        },
        init: {
          type: 'Literal',
          raw: '\'bla\'',
          value: 'bla'
        },
        fsTyping: {
          type: 'FirescriptTyping',
          name: 'any'
        }
      })
    })

    it('returns a variable declarator node with type binding', () => {
      const tokenStack = new TokenStack([
        { type: 'identifier', value: 'str' },
        { type: 'identifier', value: 'res' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '\'bla\'' }
      ])

      const node = new VariableDeclarator(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('VariableDeclarator')
      inspect(node.toJSON(ctx)).isEql({
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'res'
        },
        init: {
          type: 'Literal',
          raw: '\'bla\'',
          value: 'bla'
        },
        fsTyping: {
          type: 'FirescriptTyping',
          name: 'str'
        }
      })
    })
  })
})
