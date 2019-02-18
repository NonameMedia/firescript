const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ImportNamespaceSpecifier = require('../../../src/fs-nodes/ImportNamespaceSpecifier')

describe('ImportNamespaceSpecifier', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a ImportNamespaceSpecifier node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'operator', 'value': '*' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'from' }
      ])

      const node = new ImportNamespaceSpecifier(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportNamespaceSpecifier')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ImportNamespaceSpecifier',
        local: {
          type: 'Identifier',
          name: 'foo'
        }
      })
    })
  })
})
