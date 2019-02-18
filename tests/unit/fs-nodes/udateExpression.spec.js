const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const Identifier = require('../../../src/fs-nodes/Identifier')
const UpdateExpression = require('../../../src/fs-nodes/UpdateExpression')

describe('UpdateExpression', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns an UpdateExpression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'num' },
        { 'type': 'operator', 'value': '++' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new UpdateExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('UpdateExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'UpdateExpression',
        argument: {
          type: 'Identifier',
          name: 'num'
        },
        operator: '++',
        prefix: false
      })
    })

    it('returns an UpdateExpression node, get argument from outside', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'num' },
        { 'type': 'operator', 'value': '++' },
        { 'type': 'indention', 'value': 0 }
      ])

      const arg = new Identifier(tokenStack)
      const node = new UpdateExpression(tokenStack, null, arg)

      inspect(node).isObject()
      inspect(node.type).isEql('UpdateExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'UpdateExpression',
        argument: {
          type: 'Identifier',
          name: 'num'
        },
        operator: '++',
        prefix: false
      })
    })

    it('returns an UpdateExpression node, prefixed argument', () => {
      const tokenStack = new TokenStack([
        { 'type': 'operator', 'value': '++' },
        { 'type': 'identifier', 'value': 'num' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new UpdateExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('UpdateExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'UpdateExpression',
        argument: {
          type: 'Identifier',
          name: 'num'
        },
        operator: '++',
        prefix: true
      })
    })
  })
})
