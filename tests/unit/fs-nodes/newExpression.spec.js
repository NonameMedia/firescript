const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const NewExpression = require('../../../src/fs-nodes/NewExpression')

describe('NewExpression', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a call expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'new' },
        { type: 'identifier', value: 'Banana' },
        { type: 'punctuator', value: '(' },
        { type: 'numeric', value: '1' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const node = new NewExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('NewExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'NewExpression',
        callee: {
          type: 'Identifier',
          name: 'Banana'
        },
        arguments: [{
          type: 'Literal',
          raw: '1',
          value: 1
        }]
      })
    })

    it('returns a call expression node with arguments', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'new' },
        { type: 'identifier', value: 'Banana' },
        { type: 'punctuator', value: '(' },
        { type: 'numeric', value: '1' },
        { type: 'punctuator', value: ',' },
        { type: 'numeric', value: '2' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const node = new NewExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('NewExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'NewExpression',
        callee: {
          type: 'Identifier',
          name: 'Banana'
        },
        arguments: [{
          type: 'Literal',
          raw: '1',
          value: 1
        }, {
          type: 'Literal',
          raw: '2',
          value: 2
        }]
      })
    })

    it('returns a call expression node without any arguments', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'new' },
        { type: 'identifier', value: 'Banana' },
        { type: 'punctuator', value: '(' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const node = new NewExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('NewExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'NewExpression',
        callee: {
          type: 'Identifier',
          name: 'Banana'
        },
        arguments: []
      })
    })

    it('returns a call expression node with member expression as argument', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'new' },
        { type: 'identifier', value: 'Banana' },
        { type: 'punctuator', value: '(' },
        { type: 'identifier', value: 'fruits' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'name' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const node = new NewExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('NewExpression')
      inspect(node.toJSON(ctx)).isEql({
        type: 'NewExpression',
        callee: {
          type: 'Identifier',
          name: 'Banana'
        },
        arguments: [{
          computed: false,
          type: 'MemberExpression',
          property: {
            type: 'Identifier',
            name: 'name'
          },
          object: {
            type: 'Identifier',
            name: 'fruits'
          }
        }]
      })
    })
  })
})
