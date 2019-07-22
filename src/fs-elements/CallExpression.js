const FirescriptElement = require('./FirescriptElement')

/**
 * CallExpression
 *
 * @class CallExpression
 * @extends FirescriptElement
 *
 * interface CallExpression {
 *   type: 'CallExpression';
 *   callee: Expression;
 *   arguments: ArgumentListElement[];
 * }
 */
class CallExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
  }

  toFSString (ctx) {
    return this.renderElement(
      this.callee.toFSString(ctx) +
      '(' +
      ctx.join(this.arguments, ', ') +
      ')'
    )
  }
}

module.exports = CallExpression
