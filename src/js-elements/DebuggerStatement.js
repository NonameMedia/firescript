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
  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write('debugger;')
  }
}

module.exports = DebuggerStatement
