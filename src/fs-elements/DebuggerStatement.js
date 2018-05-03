const FireScriptElement = require('./FireScriptElement')

/**
 * DebuggerStatement
 *
 * @class DebuggerStatement
 * @extends FireScriptElement
 *
 * interface DebuggerStatement {
 *   type: 'DebuggerStatement';
 * }
 */
class DebuggerStatement extends FireScriptElement {
  toFSString (ctx) {
    return this.renderElement('debugger')
  }
}

module.exports = DebuggerStatement
