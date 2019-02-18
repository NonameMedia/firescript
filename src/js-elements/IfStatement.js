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

  compile (buffer) {
    buffer.registerItem(this.location, 'if')
    buffer.write('if (')
    buffer.write(this.test)
    buffer.write(') ')
    buffer.write(this.consequent)

    if (this.alternate) {
      buffer.registerItem(this.location, 'else')
      buffer.write(' else ')
      buffer.write(this.alternate)
    }
  }

  toESString (ctx) {
    const alternate = this.alternate ? ' else ' + this.alternate.toESString(ctx) : ''

    return this.renderElement(
      'if (' +
      this.test.toESString(ctx) +
      ') ' +
      this.consequent.toESString(ctx) +
      alternate
    )
  }
}

module.exports = IfStatement
