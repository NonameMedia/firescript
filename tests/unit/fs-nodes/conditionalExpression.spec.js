const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const Identifier = require('../../../src/fs-nodes/Identifier')
const ConditionalExpression = require('../../../src/fs-nodes/ConditionalExpression')

describe('ConditionalExpression', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns an ConditionalExpression', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'punctuator', 'value': '?' },
        { 'type': 'identifier', 'value': 'true' },
        { 'type': 'punctuator', 'value': ':' },
        { 'type': 'identifier', 'value': 'false' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ConditionalExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ConditionalExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ConditionalExpression',
        test: {
          type: 'Identifier',
          name: 'banana'
        },
        consequent: {
          type: 'Identifier',
          name: 'true'
        },
        alternate: {
          type: 'Identifier',
          name: 'false'
        }
      })
    })

    it('returns an ConditionalExpression, get test param from outside', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'punctuator', 'value': '?' },
        { 'type': 'identifier', 'value': 'true' },
        { 'type': 'punctuator', 'value': ':' },
        { 'type': 'identifier', 'value': 'false' },
        { 'type': 'indention', 'value': 0 }
      ])

      const test = new Identifier(tokenStack)
      const node = new ConditionalExpression(tokenStack, null, test)

      inspect(node).isObject()
      inspect(node.type).isEql('ConditionalExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ConditionalExpression',
        test: {
          type: 'Identifier',
          name: 'banana'
        },
        consequent: {
          type: 'Identifier',
          name: 'true'
        },
        alternate: {
          type: 'Identifier',
          name: 'false'
        }
      })
    })
  })
})
