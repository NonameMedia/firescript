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
    buffer.write(this.left)
    buffer.write(` ${this.operator} `)
    buffer.write(this.right)
  }
}

module.exports = LogicalExpression
