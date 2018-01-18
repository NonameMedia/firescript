const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const MemberExpression = require('../../../src/fs-nodes/MemberExpression')

describe('MemberExpression', () => {
  describe('instance', () => {
    const tokenStack = new TokenStack([
      { 'type': 'identifier', 'value': 'bla' },
      { 'type': 'punctuator', 'value': '.' },
      { 'type': 'identifier', 'value': 'blub' }
    ])

    it('returns a fs-node item', () => {
      const node = new MemberExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('MemberExpression')
      inspect(node.object).isObject()
      inspect(node.object.toJson()).isEql({
        type: 'Identifier',
        name: 'bla'
      })
      inspect(node.property).isObject()
      inspect(node.property.toJson()).isEql({
        type: 'Identifier',
        name: 'blubb'
      })
    })
  })
})
