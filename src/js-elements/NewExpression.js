const JSElement = require('./JSElement')

/**
 * NewExpression
 *
 * @class NewExpression
 * @extends JSElement
 *
 * interface NewExpression {
 *   type: 'NewExpression';
 *   callee: Expression;
 *   arguments: ArgumentListElement[];
 * }
 */
class NewExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'new')
    buffer.write('new')
    buffer.write(this.callee)
    buffer.write('(')
    buffer.loop(this.arguments, ', ')
    buffer.write(')')
  }

  toESString (ctx) {
    return this.renderElement(
      'new ' +
      this.callee.toESString(ctx) +
      '(' +
      ctx.join(this.arguments, ', ') +
      ')'
    )
  }
}

module.exports = NewExpression
