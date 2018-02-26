const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const BreakStatement = require('../../../src/fs-nodes/BreakStatement')

describe('BreakStatement', () => {
  describe('instance', () => {
    it('returns a BreakStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'break' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new BreakStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('BreakStatement')
      inspect(node.toJSON()).isEql({
        type: 'BreakStatement',
        label: null
      })
    })

    it('returns a BreakStatement node with a label', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'break' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new BreakStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('BreakStatement')
      inspect(node.toJSON()).isEql({
        type: 'BreakStatement',
        label: null
      })
    })
  })
})
