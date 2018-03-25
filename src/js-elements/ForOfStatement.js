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

  toESString (ctx) {
    return 'for (' +
      this.left.toESString(ctx) +
      ' of ' +
      this.right.toESString(ctx) +
      ') ' +
      this.body.toESString(ctx)
  }
}

module.exports = ForOfStatement
