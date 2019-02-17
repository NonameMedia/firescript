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

  compile (buffer) {
    buffer.registerItem(this.location, 'debugger')
    buffer.write('debugger ')
    buffer.write(this.argument)
  }
}

module.exports = DebuggerStatement
