const JSElement = require('./JSElement')

/**
 * WhileStatement
 *
 * @class WhileStatement
 * @extends JSElement
 *
 * interface WhileStatement {
    type: 'WhileStatement';
    test: Expression;
    body: Statement;
}
*/
class WhileStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element WhileStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = WhileStatement
