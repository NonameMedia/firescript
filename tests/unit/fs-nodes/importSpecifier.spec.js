const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ImportSpecifier = require('../../../src/fs-nodes/ImportSpecifier')

describe('ImportSpecifier', () => {
  describe('instance', () => {
    it('returns a ImportSpecifier node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'foo' }
      ])

      const node = new ImportSpecifier(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportSpecifier')
      inspect(node.toJSON()).isEql({
        type: 'ImportSpecifier',
        imported: {
          type: 'Identifier',
          name: 'foo'
        },
        local: {
          type: 'Identifier',
          name: 'foo'
        }
      })
    })

    it('returns a ImportSpecifier node, without local name', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '}' }
      ])

      const node = new ImportSpecifier(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportSpecifier')
      inspect(node.toJSON()).isEql({
        type: 'ImportSpecifier',
        imported: {
          type: 'Identifier',
          name: 'foo'
        },
        local: {
          type: 'Identifier',
          name: 'foo'
        }
      })
    })
  })
})
