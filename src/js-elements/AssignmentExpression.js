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
    const right = this.right ? this.right.toESString(ctx) : null
    return this.renderElement(
      this.left.toESString(ctx) +
      ' ' +
      this.operator +
      ' ' +
      right
    )
  }
}

module.exports = AssignmentExpression
