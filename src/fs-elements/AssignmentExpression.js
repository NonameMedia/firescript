const FireScriptElement = require('./FireScriptElement')

/**
 * AssignmentExpression
 *
 * @class AssignmentExpression
 * @extends FireScriptElement
 *
 * interface AssignmentExpression {
 *   type: 'AssignmentExpression';
 *   operator: '=' | '*=' | '**=' | '/=' | '%=' | '+=' | '-=' |
 *       '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|=';
 *   left: Expression;
 *   right: Expression;
 * }
 */
class AssignmentExpression extends FireScriptElement {
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
