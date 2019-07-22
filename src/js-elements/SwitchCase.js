const JSElement = require('./JSElement')

/**
 * SwitchCase
 *
 * @class SwitchCase
 * @extends JSElement
 *
 * interface SwitchCase {
 *   type: 'SwitchCase';
 *   test: Expression;
 *   consequent: Statement[];
 * }
 */
class SwitchCase extends JSElement {
  constructor (ast) {
    super(ast)

    this.test = ast.test ? this.createElement(ast.test) : null
    this.consequent = this.createElementList(ast.consequent)
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    if (this.test) {
      buffer.write('case ')
      buffer.write(this.test)
    } else {
      buffer.write('default')
    }

    buffer.write(':')

    if (this.consequent.length > 0) {
      buffer.indent(1)
      buffer.loop(this.consequent, buffer.getIndent())
      buffer.indent(-1, true)
      // buffer.nl()
    }
  }
}

module.exports = SwitchCase
