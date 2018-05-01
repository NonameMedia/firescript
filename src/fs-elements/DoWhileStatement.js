const FireScriptElement = require('./FireScriptElement')

/**
 * DoWhileStatement
 *
 * @class DoWhileStatement
 * @extends FireScriptElement
 *
 * interface DoWhileStatement {
 *   type: 'DoWhileStatement';
 *   body: Statement;
 *   test: Expression;
 * }
 */
class DoWhileStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElement(ast.body)
    this.test = this.createElement(ast.test)
  }

  toESString (ctx) {
    return this.renderElement(
      'do ' +
      this.body.toESString(ctx) +
      ' while (' +
      this.test.toESString(ctx) +
      ');'
    )
  }
}

module.exports = DoWhileStatement
