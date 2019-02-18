const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ContinueStatement = require('../../../src/fs-nodes/ContinueStatement')

describe('ContinueStatement', () => {
  describe('instance', () => {
    const ctx = {}

    it('returns a ContinueStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'continue' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ContinueStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ContinueStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ContinueStatement',
        label: null
      })
    })

    it('returns a ContinueStatement node with a label', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'continue' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new ContinueStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ContinueStatement')
      inspect(node.toJSON(ctx)).isEql({
        type: 'ContinueStatement',
        label: null
      })
    })
  })
})
