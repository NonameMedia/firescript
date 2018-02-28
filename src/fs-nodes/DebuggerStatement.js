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

    if (tokenStack.expect('identifier')) {
      this.lable = this.createIdentifierNode(tokenStack)
    } else {
      this.label = null
    }
  }

  toJSON () {
    return {
      type: 'DebuggerStatement',
      label: this.label ? this.label.toJSON() : null
    }
  }
}

module.exports = DebuggerStatement
