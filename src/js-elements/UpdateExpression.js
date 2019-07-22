const JSElement = require('./JSElement')

/**
 * UpdateExpression
 *
 * @class UpdateExpression
 * @extends JSElement
 *
 * interface UpdateExpression {
 *   type: 'UpdateExpression';
 *   operator: '++' | '--';
 *   argument: Expression;
 *   prefix: boolean;
 * }
 */
class UpdateExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.operator = ast.operator
    this.argument = this.createElement(ast.argument)
    this.prefix = ast.prefix
  }

  compile (buffer) {
    if (this.prefix) {
      buffer.write(this.operator)
      buffer.write(this.argument)
    } else {
      buffer.write(this.argument)
      buffer.write(this.operator)
    }
  }

  toESString (ctx) {
    if (this.prefix) {
      return this.renderElement(
        this.operator +
        this.argument.toESString(ctx)
      )
    } else {
      return this.renderElement(
        this.argument.toESString(ctx) +
        this.operator
      )
    }
  }
}

module.exports = UpdateExpression
