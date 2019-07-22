const FirescriptElement = require('./FirescriptElement')

/**
 * DebuggerStatement
 *
 * @class DebuggerStatement
 * @extends FirescriptElement
 *
 * interface DebuggerStatement {
 *   type: 'DebuggerStatement';
 * }
 */
class DebuggerStatement extends FirescriptElement {
  toFSString (ctx) {
    return this.renderElement('debugger')
  }
}

module.exports = DebuggerStatement
