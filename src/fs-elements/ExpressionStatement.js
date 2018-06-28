const FirescriptElement = require('./FirescriptElement')

/**
 * ExpressionStatement
 *
 * @class ExpressionStatement
 * @extends FirescriptElement
 *
 * interface ExpressionStatement {
 *   type: 'ExpressionStatement';
 *   expression: Expression;
 *   directive?: string;
 * }
 */
class ExpressionStatement extends FirescriptElement {
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
