const JSElement = require('./JSElement')

/**
 * AwaitExpression
 *
 * @class AwaitExpression
 * @extends JSElement
 *
 * interface AwaitExpression {
    type: 'AwaitExpression';
    argument: Expression;
}
*/
class AwaitExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element AwaitExpression is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = AwaitExpression
