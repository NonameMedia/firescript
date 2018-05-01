const FireScriptElement = require('./FireScriptElement')

/**
 * WhileStatement
 *
 * @class WhileStatement
 * @extends FireScriptElement
 *
 * interface WhileStatement {
    type: 'WhileStatement';
    test: Expression;
    body: Statement;
}
*/
class WhileStatement extends FireScriptElement {
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
