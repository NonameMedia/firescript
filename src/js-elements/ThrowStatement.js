const JSElement = require('./JSElement')

/**
 * ThrowStatement
 *
 * @class ThrowStatement
 * @extends JSElement
 *
 * interface ThrowStatement {
    type: 'ThrowStatement';
    argument: Expression;
}
*/
class ThrowStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ThrowStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ThrowStatement
