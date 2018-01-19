const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const MemberExpression = require('../../../src/fs-nodes/MemberExpression')

describe('MemberExpression', () => {
  describe('instance', () => {
    it('returns a member expression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'bla' },
        { 'type': 'punctuator', 'value': '.' },
        { 'type': 'identifier', 'value': 'blub' }
      ])

      // const objectNode = new Identifier(tokenStack)
      const node = new MemberExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('MemberExpression')
      inspect(node.object).isObject()
      inspect(node.object.toJSON()).isEql({
        type: 'Identifier',
        name: 'bla'
      })
      inspect(node.property).isObject()
      inspect(node.property.toJSON()).isEql({
        type: 'Identifier',
        name: 'blub'
      })
    })

    it('returns a member expression node with sub nodes', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'bla' },
        { 'type': 'punctuator', 'value': '.' },
        { 'type': 'identifier', 'value': 'blub' },
        { 'type': 'punctuator', 'value': '.' },
        { 'type': 'identifier', 'value': 'blob' }
      ])

      // const objectNode = new Identifier(tokenStack)
      const childNode = new MemberExpression(tokenStack)
      const node = new MemberExpression(tokenStack, null, childNode)

      inspect(node).isObject()
      inspect(node.type).isEql('MemberExpression')
      inspect(node.object).isObject()
      inspect(node.toJSON()).isEql({
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'bla'
          },
          property: {
            type: 'Identifier',
            name: 'blub'
          }
        },
        property: {
          type: 'Identifier',
          name: 'blob'
        }
      })
    })
  })
})
