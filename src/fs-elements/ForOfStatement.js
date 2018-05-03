const FireScriptElement = require('./FireScriptElement')

/**
 * ForOfStatement
 *
 * @class ForOfStatement
 * @extends FireScriptElement
 *
 * interface ForOfStatement {
 *   type: 'ForOfStatement';
 *   left: Expression;
 *   right: Expression;
 *   body: Statement;
 * }
 */
class ForOfStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
    this.body = this.createElement(ast.body)
  }

  toFSString (ctx) {
    return this.renderElement(
      'for ' +
      this.left.toFSString(ctx) +
      ' of ' +
      this.right.toFSString(ctx) +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = ForOfStatement
