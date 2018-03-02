const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const CallExpression = require('../../../src/fs-nodes/CallExpression')
const SequenceExpression = require('../../../src/fs-nodes/SequenceExpression')

describe('SequenceExpression', () => {
  describe('instance', () => {
    it(`returns an SequenceExpression`, () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'punctuator', 'value': ',' },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' }
      ])

      const node = new SequenceExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('SequenceExpression')
      inspect(node.toJSON()).isEql({
        type: 'SequenceExpression',
        expressions: [{
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'foo'
          },
          arguments: []
        }, {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'bar'
          },
          arguments: []
        }]
      })
    })

    it(`returns an SequenceExpression`, () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'punctuator', 'value': ',' },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' }
      ])

      const callExpression = new CallExpression(tokenStack)
      const node = new SequenceExpression(tokenStack, null, callExpression)

      inspect(node).isObject()
      inspect(node.type).isEql('SequenceExpression')
      inspect(node.toJSON()).isEql({
        type: 'SequenceExpression',
        expressions: [{
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'foo'
          },
          arguments: []
        }, {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'bar'
          },
          arguments: []
        }]
      })
    })
  })
})
