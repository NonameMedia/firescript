const JSElement = require('./JSElement')

/**
 * BreakStatement
 *
 * @class BreakStatement
 * @extends JSElement
 *
 * interface BreakStatement {
    type: 'BreakStatement';
    label: Identifier | null;
}
*/
class BreakStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element BreakStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = BreakStatement
