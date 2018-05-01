const FireScriptElement = require('./FireScriptElement')

/**
 * ExpressionStatement
 *
 * @class ExpressionStatement
 * @extends FireScriptElement
 *
 * interface ExpressionStatement {
 *   type: 'ExpressionStatement';
 *   expression: Expression;
 *   directive?: string;
 * }
 */
class ExpressionStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.expression = this.createElement(ast.expression)
  }

  toFSString (ctx) {
    return this.renderElement(
      this.expression.toFSString(ctx)
    )
  }
}

module.exports = ExpressionStatement
