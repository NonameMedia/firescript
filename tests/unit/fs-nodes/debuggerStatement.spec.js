const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const DebuggerStatement = require('../../../src/fs-nodes/DebuggerStatement')

describe('DebuggerStatement', () => {
  describe('instance', () => {
    it('returns a DebuggerStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'debugger' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = new DebuggerStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('DebuggerStatement')
      inspect(node.toJSON()).isEql({
        type: 'DebuggerStatement'
      })
    })
  })
})
