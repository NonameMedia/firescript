const FirescriptElement = require('./FirescriptElement')

/**
 * AwaitExpression
 *
 * @class AwaitExpression
 * @extends FirescriptElement
 *
 * interface AwaitExpression {
 *   type: 'AwaitExpression';
 *   argument: Expression;
 * }
 */
class AwaitExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toFSString (ctx) {
    return this.renderElement(
      'await ' +
      this.argument.toFSString(ctx)
    )
  }
}

module.exports = AwaitExpression
