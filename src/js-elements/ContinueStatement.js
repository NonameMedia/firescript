const JSElement = require('./JSElement')

/**
 * ContinueStatement
 *
 * @class ContinueStatement
 * @extends JSElement
 *
 * interface ContinueStatement {
    type: 'ContinueStatement';
    label: Identifier | null;
}
*/
class ContinueStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ContinueStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ContinueStatement
