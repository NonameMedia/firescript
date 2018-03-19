const JSElement = require('./JSElement')

/**
 * DoWhileStatement
 *
 * @class DoWhileStatement
 * @extends JSElement
 *
 * interface DoWhileStatement {
    type: 'DoWhileStatement';
    body: Statement;
    test: Expression;
}
*/
class DoWhileStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element DoWhileStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = DoWhileStatement
