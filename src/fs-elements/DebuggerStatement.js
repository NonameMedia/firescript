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
  toESString (ctx) {
    return this.renderElement('debugger;')
  }
}

module.exports = DebuggerStatement
