const JSElement = require('./JSElement')

/**
 * IfStatement
 *
 * @class IfStatement
 * @extends JSElement
 *
 * interface IfStatement {
 *   type: 'IfStatement';
 *   test: Expression;
 *   consequent: Statement;
 *   alternate?: Statement;
 * }
 */
class IfStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.test = this.createElement(ast.test)
    this.consequent = this.createElement(ast.consequent)
    this.alternate = ast.alternate ? this.createElement(ast.alternate) : null
  }

  toESString (ctx) {
    const alternate = this.alternate ? ' else ' + this.alternate.toESString(ctx) : ''

    return 'if (' +
      this.test.toESString(ctx) +
      ') ' +
      this.consequent.toESString(ctx) +
      alternate
  }
}

module.exports = IfStatement
