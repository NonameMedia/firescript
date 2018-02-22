const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ImportDefaultSpecifier = require('../../../src/fs-nodes/ImportDefaultSpecifier')

describe('ImportDefaultSpecifier', () => {
  describe('instance', () => {
    it('returns a ImportDefaultSpecifier node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'from' }
      ])

      const node = new ImportDefaultSpecifier(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportDefaultSpecifier')
      inspect(node.toJSON()).isEql({
        type: 'ImportDefaultSpecifier',
        local: {
          type: 'Identifier',
          name: 'foo'
        }
      })
    })

    it('returns a ImportDefaultSpecifier node, without local name', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'from' }
      ])

      const node = new ImportDefaultSpecifier(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportDefaultSpecifier')
      inspect(node.toJSON()).isEql({
        type: 'ImportDefaultSpecifier',
        local: {
          type: 'Identifier',
          name: 'foo'
        }
      })
    })
  })
})
