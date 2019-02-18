const JSElement = require('./JSElement')

/**
 * WhileStatement
 *
 * @class WhileStatement
 * @extends JSElement
 *
 * interface WhileStatement {
    type: 'WhileStatement';
    test: Expression;
    body: Statement;
}
*/
class WhileStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.test = this.createElement(ast.test)
    this.body = this.createElement(ast.body)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'while')
    buffer.write('while (')
    buffer.write(this.test)
    buffer.write(') ')
    buffer.write(this.body)
  }

  toESString (ctx) {
    return this.renderElement(
      'while (' +
      this.test.toESString(ctx) +
      ') ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = WhileStatement
