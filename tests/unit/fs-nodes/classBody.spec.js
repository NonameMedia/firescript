const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ClassBody = require('../../../src/fs-nodes/ClassBody')

describe('ClassBody', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a ClassBody node', () => {
      const tokenStack = new TokenStack([
        { type: 'indention', value: 2 },
        { type: 'identifier', value: 'constructor' },
        { type: 'punctuator', value: '(' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: 4 },
        { type: 'identifier', value: 'this' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'color' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '\'yellow\'' },
        { type: 'indention', value: 2 },
        { type: 'identifier', value: 'getColor' },
        { type: 'punctuator', value: '(' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: 4 },
        { type: 'keyword', value: 'return' },
        { type: 'identifier', value: 'this' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'color' },
        { type: 'indention', value: 0 }
      ])

      const node = new ClassBody(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ClassBody')
      inspect(node.body).isArray()
      inspect(node.body).hasLength(2)
      inspect(node.body[0].toJSON(ctx)).hasProps({
        type: 'MethodDefinition'
      })

      inspect(node.body[1].toJSON(ctx)).hasProps({
        type: 'MethodDefinition'
      })
    })
  })
})
