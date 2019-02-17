const JSElement = require('./JSElement')

/**
 * LogicalExpression
 *
 * @class LogicalExpression
 * @extends JSElement
 *
 * interface LogicalExpression {
 *    type: 'LogicalExpression';
 *    operator: '||' | '&&';
 *    left: Expression;
 *    right: Expression;
 *}
 */
class LogicalExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
    this.operator = ast.operator
  }

  compile (buffer) {
    buffer.registerItem(this.location, this.id)
    buffer.write(this.left)
    buffer.write(` ${this.operator} `)
    buffer.write(this.right)
  }

  toESString (ctx) {
    return this.renderElement(
      `${this.left.toESString(ctx)} ${this.operator} ${this.right.toESString(ctx)}`
    )
  }
}

module.exports = LogicalExpression
