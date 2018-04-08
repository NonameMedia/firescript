const FireScriptNode = require('./FireScriptNode')

/**
 * DebuggerStatement
 *
 * @class DebuggerStatement
 * @extends FireScriptNo
 *
 * interface DebuggerStatement {
 *   type: 'DebuggerStatement';
 * }
 */
class DebuggerStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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
