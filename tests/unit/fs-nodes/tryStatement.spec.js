const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const TryStatement = require('../../../src/fs-nodes/TryStatement')

describe('TryStatement', () => {
  describe('instance', () => {
    it('returns a TryStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'try' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'indention', 'value': 0 },
        { 'type': 'keyword', 'value': 'catch' },
        { 'type': 'identifier', 'value': 'err' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new TryStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('TryStatement')
      inspect(node.toJSON()).isEql({
        type: 'TryStatement',
        block: {
          type: 'BlockStatement',
          body: []
        },
        handler: {
          type: 'CatchClause',
          param: {
            type: 'Identifier',
            name: 'err'
          },
          body: {
            type: 'BlockStatement',
            body: []
          }
        },
        finalizer: null
      })
    })
  })
})
