const JSElement = require('./JSElement')

/**
 * LogicalExpression
 *
 * @class LogicalExpression
 * @extends JSElement
 *
 * interface LogicalExpression {
    type: 'LogicalExpression';
    operator: '||' | '&&';
    left: Expression;
    right: Expression;
}
*/
class LogicalExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element LogicalExpression is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = LogicalExpression
