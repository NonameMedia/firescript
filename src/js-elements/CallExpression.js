const JSElement = require('./JSElement')

/**
 * CallExpression
 *
 * @class CallExpression
 * @extends JSElement
 *
 * interface CallExpression {
 *   type: 'CallExpression';
 *   callee: Expression;
 *   arguments: ArgumentListElement[];
 * }
 */
class CallExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
  }

  compile (buffer) {
    buffer.write(this.callee)
    buffer.write('(')
    buffer.loop(this.arguments, ', ')
    buffer.write(')')
  }
}

module.exports = CallExpression
