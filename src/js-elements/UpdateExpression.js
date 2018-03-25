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

  toESString (ctx) {
    if (this.prefix) {
      return this.operator +
        this.argument.toESString(ctx)
    } else {
      return this.argument.toESString(ctx) +
        this.operator
    }
  }
}

module.exports = UpdateExpression
