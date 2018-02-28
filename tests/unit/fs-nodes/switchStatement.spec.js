const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const SwitchStatement = require('../../../src/fs-nodes/SwitchStatement')

describe('SwitchStatement', () => {
  describe('instance', () => {
    it('returns an SwitchStatement', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'switch' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'case' },
        { 'type': 'literal', 'value': '"banana"' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'keyword', 'value': 'break' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new SwitchStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('SwitchStatement')
      inspect(node.toJSON()).isEql({
        type: 'SwitchStatement',
        discriminant: {
          type: 'Identifier',
          name: 'banana'
        },
        cases: [{
          type: 'SwitchCase',
          test: {
            type: 'Literal',
            raw: '"banana"',
            value: 'banana'
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
        }]
      })
    })

    it('returns an SwitchStatement with multiple cases', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'switch' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'case' },
        { 'type': 'literal', 'value': '"banana"' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'keyword', 'value': 'break' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'case' },
        { 'type': 'literal', 'value': '"apple"' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'keyword', 'value': 'break' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new SwitchStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('SwitchStatement')
      inspect(node.toJSON()).isEql({
        type: 'SwitchStatement',
        discriminant: {
          type: 'Identifier',
          name: 'banana'
        },
        cases: [{
          type: 'SwitchCase',
          test: {
            type: 'Literal',
            raw: '"banana"',
            value: 'banana'
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
        }, {
          type: 'SwitchCase',
          test: {
            type: 'Literal',
            raw: '"apple"',
            value: 'apple'
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
        }]
      })
    })
  })
})
