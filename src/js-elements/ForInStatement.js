const JSElement = require('./JSElement')

/**
 * ForInStatement
 *
 * @class ForInStatement
 * @extends JSElement
 *
 * interface ForInStatement {
 *   type: 'ForInStatement';
 *   left: Expression;
 *   right: Expression;
 *   body: Statement;
 * }
 */
class ForInStatement extends JSElement {
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
    buffer.write(' in ')
    buffer.write(this.right)
    buffer.write(')')
    buffer.write(this.body)
  }

  toESString (ctx) {
    return this.renderElement('for (' +
      this.left.toESString(ctx) +
      ' in ' +
      this.right.toESString(ctx) +
      ') ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = ForInStatement
