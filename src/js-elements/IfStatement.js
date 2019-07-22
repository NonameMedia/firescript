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
    buffer.registerItem(this.location)
    buffer.write('if (')
    buffer.write(this.test)
    buffer.write(') ')
    buffer.write(this.consequent)

    if (this.alternate) {
      const loc = Object.assign({}, this.alternate.location)
      loc.column -= 6
      buffer.write(' ')
      // buffer.registerItem(loc)
      buffer.write('else ')
      buffer.write(this.alternate)
    }
  }
}

module.exports = IfStatement
