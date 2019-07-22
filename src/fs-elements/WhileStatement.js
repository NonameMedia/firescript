const FirescriptElement = require('./FirescriptElement')

/**
 * WhileStatement
 *
 * @class WhileStatement
 * @extends FirescriptElement
 *
 * interface WhileStatement {
    type: 'WhileStatement';
    test: Expression;
    body: Statement;
}
*/
class WhileStatement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.test = this.createElement(ast.test)
    this.body = this.createElement(ast.body)
  }

  toFSString (ctx) {
    return this.renderElement(
      'while ' +
      this.test.toFSString(ctx) +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = WhileStatement
