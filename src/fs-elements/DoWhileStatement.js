const FirescriptElement = require('./FirescriptElement')

/**
 * DoWhileStatement
 *
 * @class DoWhileStatement
 * @extends FirescriptElement
 *
 * interface DoWhileStatement {
 *   type: 'DoWhileStatement';
 *   body: Statement;
 *   test: Expression;
 * }
 */
class DoWhileStatement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElement(ast.body)
    this.test = this.createElement(ast.test)
  }

  toFSString (ctx) {
    return this.renderElement(
      'do' +
      this.body.toFSString(ctx) +
      'while ' +
      this.test.toFSString(ctx)
    )
  }
}

module.exports = DoWhileStatement
