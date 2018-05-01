const FireScriptElement = require('./FireScriptElement')

/**
 * AwaitExpression
 *
 * @class AwaitExpression
 * @extends FireScriptElement
 *
 * interface AwaitExpression {
 *   type: 'AwaitExpression';
 *   argument: Expression;
 * }
 */
class AwaitExpression extends FireScriptElement {
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
