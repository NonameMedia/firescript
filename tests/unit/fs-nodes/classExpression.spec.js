const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ClassExpression = require('../../../src/fs-nodes/ClassExpression')

describe('ClassExpression', () => {
  describe('instance', () => {
    it('returns a ClassExpression node', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'class' },
        { type: 'identifier', value: 'bla' },
        { type: 'indention', value: '0' }
      ])

      const node = new ClassExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ClassExpression')
      inspect(node.id).isObject()
      inspect(node.id.toJSON()).isEql({
        type: 'Identifier',
        name: 'bla'
      })
      inspect(node.superClass).isNull()
      inspect(node.body).isObject()
    })
  })
})
