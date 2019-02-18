const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const Program = require('../../../src/fs-nodes/Program')

describe('Program', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a Program node', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'func' },
        { type: 'identifier', value: 'bla' },
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'say' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '2' }
      ])

      const node = new Program(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Program')
      inspect(node.toJSON(ctx)).isEql({
        type: 'Program',
        sourceType: 'module',
        body: [{
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'bla'
          },
          params: [{
            type: 'Identifier',
            name: 'say'
          }],
          fsParamTypings: [{
            type: 'FirescriptTyping',
            name: 'any'
          }],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          expression: false,
          generator: false
        }]
      })
    })

    it('returns a Program node for a script program', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'func' },
        { type: 'identifier', value: 'bla' },
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'say' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '2' }
      ])

      const node = new Program(tokenStack, null, 'script')

      inspect(node).isObject()
      inspect(node.type).isEql('Program')
      inspect(node.toJSON(ctx)).isEql({
        type: 'Program',
        sourceType: 'script',
        body: [{
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'bla'
          },
          params: [{
            type: 'Identifier',
            name: 'say'
          }],
          fsParamTypings: [{
            type: 'FirescriptTyping',
            name: 'any'
          }],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          expression: false,
          generator: false
        }]
      })
    })
  })
})
