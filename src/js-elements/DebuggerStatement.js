const JSElement = require('./JSElement')

/**
 * DebuggerStatement
 *
 * @class DebuggerStatement
 * @extends JSElement
 *
 * interface DebuggerStatement {
 *   type: 'DebuggerStatement';
 * }
 */
class DebuggerStatement extends JSElement {
  toESString (ctx) {
    return this.renderElement('debugger;')
  }
}

module.exports = DebuggerStatement
