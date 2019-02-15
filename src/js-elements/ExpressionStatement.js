const JSElement = require('./JSElement')

/**
 * ExpressionStatement
 *
 * @class ExpressionStatement
 * @extends JSElement
 *
 * interface ExpressionStatement {
 *   type: 'ExpressionStatement';
 *   expression: Expression;
 *   directive?: string;
 * }
 */
class ExpressionStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.expression = this.createElement(ast.expression)
  }

  compile (buffer) {
    buffer.write(this.expression)
    buffer.write(';')
  }

  toESString (ctx) {
    return this.renderElement(
      this.expression.toESString(ctx) +
      ';'
    )
  }
}

module.exports = ExpressionStatement
