const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const MethodDefinition = require('../../../src/fs-nodes/MethodDefinition')

describe('MethodDefinition', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a MethodDefinition node', () => {
      const tokenStack = new TokenStack([
        { type: 'identifier', value: 'constructor' },
        { type: 'punctuator', value: '(' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: 4 },
        { type: 'indention', value: 2 }
      ])

      const node = new MethodDefinition(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('MethodDefinition')
      inspect(node.toJSON(ctx)).isEql({
        type: 'MethodDefinition',
        computed: false,
        kind: 'constructor',
        key: {
          name: 'constructor',
          type: 'Identifier'
        },
        static: false,
        async: false,
        value: {
          async: false,
          body: {
            body: [],
            type: 'BlockStatement'
          },
          expression: false,
          generator: false,
          id: null,
          params: [],
          fsParamTypings: [],
          type: 'FunctionExpression'
        }
      })
    })

    it('returns a MethodDefinition node', () => {
      const tokenStack = new TokenStack([
        { type: 'identifier', value: 'isBanana' },
        { type: 'punctuator', value: '(' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: 4 },
        { type: 'indention', value: 2 }
      ])

      const node = new MethodDefinition(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('MethodDefinition')
      inspect(node.toJSON(ctx)).isEql({
        type: 'MethodDefinition',
        computed: false,
        kind: 'method',
        key: {
          name: 'isBanana',
          type: 'Identifier'
        },
        static: false,
        async: false,
        value: {
          async: false,
          body: {
            body: [],
            type: 'BlockStatement'
          },
          expression: false,
          generator: false,
          id: null,
          params: [],
          fsParamTypings: [],
          type: 'FunctionExpression'
        }
      })
    })
  })
})
