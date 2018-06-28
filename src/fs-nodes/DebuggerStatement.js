const FirescriptNode = require('./FirescriptNode')

/**
 * DebuggerStatement
 *
 * @class DebuggerStatement
 * @extends FirescriptNo
 *
 * interface DebuggerStatement {
 *   type: 'DebuggerStatement';
 * }
 */
class DebuggerStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'debugger')) {
      this.syntaxError('Unexpected token, DebuggerStatement expected', tokenStack.current())
    }

    tokenStack.goForward()
  }

  toJSON () {
    return this.createJSON({
      type: 'DebuggerStatement'
    })
  }
}

module.exports = DebuggerStatement
