const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ClassDeclaration = require('../../../src/fs-nodes/ClassDeclaration')

describe('ClassDeclaration', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a ClassDeclaration node', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'class' },
        { type: 'identifier', value: 'bla' },
        { type: 'indention', value: '0' }
      ])

      const node = new ClassDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ClassDeclaration')
      inspect(node.id).isObject()
      inspect(node.id.toJSON(ctx)).isEql({
        type: 'Identifier',
        name: 'bla'
      })
      inspect(node.superClass).isNull()
      inspect(node.body).isObject()
    })
  })
})
