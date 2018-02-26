const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const CatchClause = require('../../../src/fs-nodes/CatchClause')

describe('CatchClause', () => {
  describe('instance', () => {
    it('returns a CatchClause node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'catch' },
        { 'type': 'identifier', 'value': 'err' },
        { 'type': 'indention', 'value': 2 },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new CatchClause(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('CatchClause')
      inspect(node.toJSON()).isEql({
        type: 'CatchClause',
        param: {
          type: 'Identifier',
          name: 'err'
        },
        body: {
          type: 'BlockStatement',
          body: []
        }
      })
    })
  })
})
