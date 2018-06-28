const FirescriptElement = require('./FirescriptElement')

/**
 * UpdateExpression
 *
 * @class UpdateExpression
 * @extends FirescriptElement
 *
 * interface UpdateExpression {
 *   type: 'UpdateExpression';
 *   operator: '++' | '--';
 *   argument: Expression;
 *   prefix: boolean;
 * }
 */
class UpdateExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.operator = ast.operator
    this.argument = this.createElement(ast.argument)
    this.prefix = ast.prefix
  }

  toFSString (ctx) {
    if (this.prefix) {
      return this.renderElement(
        this.operator +
        this.argument.toFSString(ctx)
      )
    } else {
      return this.renderElement(
        this.argument.toFSString(ctx) +
        this.operator
      )
    }
  }
}

module.exports = UpdateExpression
