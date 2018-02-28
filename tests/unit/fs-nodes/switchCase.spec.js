const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const SwitchCase = require('../../../src/fs-nodes/SwitchCase')

describe('SwitchCase', () => {
  describe('instance', () => {
    it('returns an SwitchCase', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'case' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'break' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new SwitchCase(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('SwitchCase')
      inspect(node.toJSON()).isEql({
        type: 'SwitchCase',
        test: {
          type: 'Identifier',
          name: 'banana'
        },
        consequent: [{
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'foo'
            },
            arguments: []
          }
        }, {
          type: 'BreakStatement',
          label: null
        }]
      })
    })
  })
})
