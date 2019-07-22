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
    buffer.registerItem(this.location)
    buffer.write('do ')
    buffer.write(this.body)

    buffer.write(' ')
    const loc = Object.assign({}, this.test.location)
    loc.column -= 8
    buffer.registerItem(loc)
    buffer.write('while (')
    buffer.write(this.test)
    buffer.write(');')
  }
}

module.exports = DoWhileStatement
