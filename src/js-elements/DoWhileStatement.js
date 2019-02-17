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

  compile (buffer) {
    buffer.registerItem(this.location, 'do')
    buffer.write('do ')
    buffer.write(this.body)
    buffer.write('while (')
    buffer.write(this.test)
    buffer.write(');')
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
