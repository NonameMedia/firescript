const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const Identifier = require('../../../src/fs-nodes/Identifier')
const MetaProperty = require('../../../src/fs-nodes/MetaProperty')

describe('MetaProperty', () => {
  describe('instance', () => {
    it('returns a call expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'keyword', value: 'new' },
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'target' }
      ])

      const node = new MetaProperty(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('MetaProperty')
      inspect(node.toJSON()).isEql({
        type: 'MetaProperty',
        meta: {
          type: 'Identifier',
          name: 'new'
        },
        property: {
          type: 'Identifier',
          name: 'target'
        }
      })
    })

    it('returns a call expression node, get property from outside', () => {
      const tokenStack = new TokenStack([
        { type: 'punctuator', value: '.' },
        { type: 'identifier', value: 'target' }
      ])

      const meta = new Identifier(tokenStack, null, 'new')
      const node = new MetaProperty(tokenStack, null, meta)

      inspect(node).isObject()
      inspect(node.type).isEql('MetaProperty')
      inspect(node.toJSON()).isEql({
        type: 'MetaProperty',
        meta: {
          type: 'Identifier',
          name: 'new'
        },
        property: {
          type: 'Identifier',
          name: 'target'
        }
      })
    })
  })
})
