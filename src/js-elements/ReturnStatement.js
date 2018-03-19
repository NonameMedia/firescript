const JSElement = require('./JSElement')

/**
 * ReturnStatement
 *
 * @class ReturnStatement
 * @extends JSElement
 *
 * interface ReturnStatement {
    type: 'ReturnStatement';
    argument: Expression | null;
}
*/
class ReturnStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ReturnStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ReturnStatement
