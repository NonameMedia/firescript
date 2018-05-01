const FireScriptElement = require('./FireScriptElement')

/**
 * ForInStatement
 *
 * @class ForInStatement
 * @extends FireScriptElement
 *
 * interface ForInStatement {
 *   type: 'ForInStatement';
 *   left: Expression;
 *   right: Expression;
 *   body: Statement;
 * }
 */
class ForInStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
    this.body = this.createElement(ast.body)
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
