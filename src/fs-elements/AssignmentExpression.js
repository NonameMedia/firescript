const FirescriptElement = require('./FirescriptElement')

/**
 * AssignmentExpression
 *
 * @class AssignmentExpression
 * @extends FirescriptElement
 *
 * interface AssignmentExpression {
 *   type: 'AssignmentExpression';
 *   operator: '=' | '*=' | '**=' | '/=' | '%=' | '+=' | '-=' |
 *       '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|=';
 *   left: Expression;
 *   right: Expression;
 * }
 */
class AssignmentExpression extends FirescriptElement {
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

module.exports = AssignmentExpression
