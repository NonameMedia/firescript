const FirescriptElement = require('./FirescriptElement')

/**
 * BinaryExpression
 *
 * @class BinaryExpression
 * @extends FirescriptElement
 *
 * interface BinaryExpression {
 *   type: 'BinaryExpression';
 *   operator: 'instanceof' | 'in' | '+' | '-' | '*' | '/' | '%' | '**' |
 *       '|' | '^' | '&' | '==' | '!=' | '===' | '!==' |
 *       '<' | '>' | '<=' | '<<' | '>>' | '>>>';
 *   left: Expression;
 *   right: Expression;
 * }
 */
class BinaryExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
    this.operator = ast.operator
  }

  toFSString (ctx) {
    return this.renderElement(
      this.left.toFSString(ctx) +
      ' ' +
      this.operator +
      ' ' +
      this.right.toFSString(ctx)
    )
  }
}

module.exports = BinaryExpression
