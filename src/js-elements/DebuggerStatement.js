const JSElement = require('./JSElement')

/**
 * DebuggerStatement
 *
 * @class DebuggerStatement
 * @extends JSElement
 *
 * interface DebuggerStatement {
    type: 'DebuggerStatement';
}
*/
class DebuggerStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element DebuggerStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = DebuggerStatement
