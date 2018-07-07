const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const FirescriptLogStatement = require('../../../src/fs-nodes/FirescriptLogStatement')

describe('FirescriptLogStatement', () => {
  describe('instance', () => {
    it('returns a FirescriptLogStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'log' },
        { 'type': 'identifier', 'value': 'foo' }
      ])

      const node = new FirescriptLogStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FirescriptLogStatement')
      inspect(node.toJSON()).isEql({
        type: 'FirescriptLogStatement',
        arguments: [
          {
            type: 'Identifier',
            name: 'foo'
          }
        ]
      })
    })
  })
})
