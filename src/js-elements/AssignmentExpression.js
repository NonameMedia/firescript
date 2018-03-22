const JSElement = require('./JSElement')

/**
 * AssignmentExpression
 *
 * @class AssignmentExpression
 * @extends JSElement
 *
 * interface AssignmentExpression {
 *   type: 'AssignmentExpression';
 *   operator: '=' | '*=' | '**=' | '/=' | '%=' | '+=' | '-=' |
 *       '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|=';
 *   left: Expression;
 *   right: Expression;
 * }
 */
class AssignmentExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
    this.operator = ast.operator
  }

  toESString (ctx) {
    return this.left.toESString(ctx) +
      ' ' +
      this.operator +
      ' ' +
      this.right.toESString(ctx)
  }
}

module.exports = AssignmentExpression
