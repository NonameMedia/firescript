const FireScriptElement = require('./FireScriptElement')

/**
 * NewExpression
 *
 * @class NewExpression
 * @extends FireScriptElement
 *
 * interface NewExpression {
 *   type: 'NewExpression';
 *   callee: Expression;
 *   arguments: ArgumentListElement[];
 * }
 */
class NewExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
  }

  toFSString (ctx) {
    return this.renderElement(
      'new ' +
      this.callee.toFSString(ctx) +
      '(' +
      ctx.join(this.arguments, ', ') +
      ')'
    )
  }
}

module.exports = NewExpression
