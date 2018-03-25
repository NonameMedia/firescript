const JSElement = require('./JSElement')

/**
 * DoWhileStatement
 *
 * @class DoWhileStatement
 * @extends JSElement
 *
 * interface DoWhileStatement {
 *   type: 'DoWhileStatement';
 *   body: Statement;
 *   test: Expression;
 * }
 */
class DoWhileStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElement(ast.body)
    this.test = this.createElement(ast.test)
  }

  toESString (ctx) {
    return 'do ' +
      this.body.toESString(ctx) +
      ' while (' +
      this.test.toESString(ctx) +
      ');'
  }
}

module.exports = DoWhileStatement
