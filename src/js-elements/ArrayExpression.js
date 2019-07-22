const JSElement = require('./JSElement')

/**
 * ArrayExpression
 *
 * @class ArrayExpression
 * @extends JSElement
 *
 * interface ArrayExpression {
 *   type: 'ArrayExpression';
 *   elements: ArrayExpressionElement[];
 * }
 */
class ArrayExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.elements = this.createElementList(ast.elements)
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    if (this.useMultiline()) {
      buffer.write('[')
      buffer.indent(1)
      buffer.loop(this.elements, ',' + buffer.getIndent())
      buffer.indent(-1)
      buffer.write(']')
    } else {
      buffer.write('[ ')
      buffer.loop(this.elements, ', ')
      buffer.write(' ]')
    }
  }

  useMultiline () {
    return this.elements.length > 2 || this.elements.some((item) => item.method)
  }
}

module.exports = ArrayExpression
