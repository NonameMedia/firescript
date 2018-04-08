const JSElement = require('./JSElement')

/**
 * CallExpression
 *
 * @class CallExpression
 * @extends JSElement
 *
 * interface CallExpression {
 *   type: 'CallExpression';
 *   callee: Expression;
 *   arguments: ArgumentListElement[];
 * }
 */
class CallExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
  }

  toESString (ctx) {
    return this.renderElement(
      this.callee.toESString(ctx) +
      '(' +
      ctx.join(this.arguments, ', ') +
      ')'
    )
  }
}

module.exports = CallExpression
