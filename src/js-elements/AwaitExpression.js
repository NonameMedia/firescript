const JSElement = require('./JSElement')

/**
 * AwaitExpression
 *
 * @class AwaitExpression
 * @extends JSElement
 *
 * interface AwaitExpression {
 *   type: 'AwaitExpression';
 *   argument: Expression;
 * }
 */
class AwaitExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'await')
    buffer.write('await ')
    buffer.write(this.argument)
  }

  toESString (ctx) {
    return this.renderElement(
      'await ' +
      this.argument.toESString(ctx)
    )
  }
}

module.exports = AwaitExpression
