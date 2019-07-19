const FirescriptElement = require('./FirescriptElement')

/**
 * LogicalExpression
 *
 * @class LogicalExpression
 * @extends FirescriptElement
 *
 * interface LogicalExpression {
    type: 'LogicalExpression';
    operator: '||' | '&&';
    left: Expression;
    right: Expression;
}
*/
class LogicalExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
    this.operator = ast.operator
  }

  toFSString (ctx) {
    return this.renderElement(
      `${this.left.toFSString(ctx)} ${this.operator} ${this.right.toFSString(ctx)}`
    )
  }

  getLineLength () {
    return this.left.getLineLength() +
      this.operator.length +
      this.right.getLineLength() +
      3
  }
}

module.exports = LogicalExpression
