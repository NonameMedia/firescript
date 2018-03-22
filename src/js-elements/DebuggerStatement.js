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
  constructor (ast) {
    super(ast)
  }

  toESString (ctx) {
    return 'debugger;'
  }
}

module.exports = DebuggerStatement
