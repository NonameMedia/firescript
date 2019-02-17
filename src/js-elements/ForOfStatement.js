const JSElement = require('./JSElement')

/**
 * ForOfStatement
 *
 * @class ForOfStatement
 * @extends JSElement
 *
 * interface ForOfStatement {
 *   type: 'ForOfStatement';
 *   left: Expression;
 *   right: Expression;
 *   body: Statement;
 * }
 */
class ForOfStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
    this.body = this.createElement(ast.body)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'for')
    buffer.write('for (')
    buffer.write(this.left)
    buffer.write(' of ')
    buffer.write(this.right)
    buffer.write(')')
    buffer.write(this.body)
  }

  toESString (ctx) {
    return this.renderElement(
      'for (' +
      this.left.toESString(ctx) +
      ' of ' +
      this.right.toESString(ctx) +
      ') ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = ForOfStatement
