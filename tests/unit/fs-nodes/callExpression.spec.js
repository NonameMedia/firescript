const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const CallExpression = require('../../../src/fs-nodes/CallExpression')
const MemberExpression = require('../../../src/fs-nodes/MemberExpression')

describe('CallExpression', () => {
  describe('instance', () => {
    it('returns a call expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'identifier', value: 'bla' },
        { type: 'punctuator', value: '(' },
        { type: 'numeric', value: '1' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const node = new CallExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('CallExpression')
      inspect(node.toJSON()).isEql({
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'bla'
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
        { type: 'identifier', value: 'bla' },
        { type: 'punctuator', value: '(' },
        { type: 'numeric', value: '1' },
        { type: 'punctuator', value: ',' },
        { type: 'numeric', value: '2' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const node = new CallExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('CallExpression')
      inspect(node.toJSON()).isEql({
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'bla'
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
        { type: 'identifier', value: 'bla' },
        { type: 'punctuator', value: '(' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const node = new CallExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('CallExpression')
      inspect(node.toJSON()).isEql({
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'bla'
        },
        arguments: []
      })
    })

    it('returns a call expression node from a member expression', () => {
      const tokenStack = new TokenStack([
        { type: 'identifier', value: 'foo' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'bla' },
        { type: 'punctuator', value: '(' },
        { type: 'numeric', value: '1' },
        { type: 'punctuator', value: ')' },
        { type: 'indention', value: '0' }
      ])

      const callee = new MemberExpression(tokenStack)
      const node = new CallExpression(tokenStack, null, callee)

      inspect(node).isObject()
      inspect(node.type).isEql('CallExpression')
      inspect(node.toJSON()).isEql({
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'foo'
          },
          property: {
            type: 'Identifier',
            name: 'bla'
          }
        },
        arguments: [{
          type: 'Literal',
          raw: '1',
          value: 1
        }]
      })
    })
  })
})
