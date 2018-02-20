const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ForStatement = require('../../../src/fs-nodes/ForStatement')

describe('ForStatement', () => {
  describe('instance', () => {
    it('returns an ForStatement', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'for' },
        { 'type': 'keyword', 'value': 'let' },
        { 'type': 'identifier', 'value': 'i' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'numeric', 'value': '0' },
        { 'type': 'punctuator', 'value': ';' },
        { 'type': 'identifier', 'value': 'i' },
        { 'type': 'operator', 'value': '<' },
        { 'type': 'identifier', 'value': 'l' },
        { 'type': 'punctuator', 'value': ';' },
        { 'type': 'identifier', 'value': 'i' },
        { 'type': 'operator', 'value': '++' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'operator', 'value': '--' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ForStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ForStatement')
      console.log(node.toJSON())
      inspect(node.toJSON()).isEql({
        type: 'ForStatement',
        init: {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'i'
            },
            init: {
              type: 'Literal',
              raw: '0',
              value: 0
            }
          }]
        },
        test: {
          type: 'BinaryExpression',
          operator: '<',
          left: {
            type: 'Identifier',
            name: 'i'
          },
          right: {
            type: 'Identifier',
            name: 'l'
          }
        },
        update: {
          type: 'UpdateExpression',
          argument: {
            type: 'Identifier',
            name: 'i'
          },
          operator: '++',
          prefix: false
        },
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'banana'
              },
              operator: '--',
              prefix: true
            }
          }]
        }
      })
    })
  })
})
