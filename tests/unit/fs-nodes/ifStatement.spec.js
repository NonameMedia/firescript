const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const IfStatement = require('../../../src/fs-nodes/IfStatement')

describe('IfStatement', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns an IfStatement', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'if' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new IfStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('IfStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'IfStatement',
        test: {
          type: 'Identifier',
          name: 'banana'
        },
        consequent: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement',
            argument: {
              type: 'Identifier',
              name: 'banana'
            }
          }]
        },
        alternate: null
      })
    })

    it('returns an IfStatement with an alternate block', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'if' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 },
        { 'type': 'keyword', 'value': 'else' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'null' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new IfStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('IfStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'IfStatement',
        test: {
          type: 'Identifier',
          name: 'banana'
        },
        consequent: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement',
            argument: {
              type: 'Identifier',
              name: 'banana'
            }
          }]
        },
        alternate: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement',
            argument: {
              type: 'Identifier',
              name: 'null'
            }
          }]
        }
      })
    })

    it('returns an IfStatement with an alternate if block', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'if' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 },
        { 'type': 'keyword', 'value': 'else' },
        { 'type': 'keyword', 'value': 'if' },
        { 'type': 'identifier', 'value': 'pineapple' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'pineapple' }
      ])

      const node = new IfStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('IfStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'IfStatement',
        test: {
          type: 'Identifier',
          name: 'banana'
        },
        consequent: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement',
            argument: {
              type: 'Identifier',
              name: 'banana'
            }
          }]
        },
        alternate: {
          type: 'IfStatement',
          test: {
            type: 'Identifier',
            name: 'pineapple'
          },
          consequent: {
            type: 'BlockStatement',
            body: [{
              type: 'ReturnStatement',
              argument: {
                type: 'Identifier',
                name: 'pineapple'
              }
            }]
          },
          alternate: null
        }
      })
    })

    it('returns an IfStatement with two alternate blocks', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'if' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'indention', 'value': 0 },
        { 'type': 'keyword', 'value': 'elif' },
        { 'type': 'identifier', 'value': 'apple' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'apple' },
        { 'type': 'indention', 'value': 0 },
        { 'type': 'keyword', 'value': 'else' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'keyword', 'value': 'return' },
        { 'type': 'identifier', 'value': 'null' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new IfStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('IfStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'IfStatement',
        test: {
          type: 'Identifier',
          name: 'banana'
        },
        consequent: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement',
            argument: {
              type: 'Identifier',
              name: 'banana'
            }
          }]
        },
        alternate: {
          type: 'IfStatement',
          test: {
            type: 'Identifier',
            name: 'apple'
          },
          consequent: {
            type: 'BlockStatement',
            body: [{
              type: 'ReturnStatement',
              argument: {
                type: 'Identifier',
                name: 'apple'
              }
            }]
          },
          alternate: {
            type: 'BlockStatement',
            body: [{
              type: 'ReturnStatement',
              argument: {
                type: 'Identifier',
                name: 'null'
              }
            }]
          }
        }
      })
    })
  })
})
