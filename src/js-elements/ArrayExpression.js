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

  toESString (ctx) {
    return '[ ' +
    ctx.join(this.elements, ', ') +
    ' ]'
  }
}

module.exports = ArrayExpression
