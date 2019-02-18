const JSElement = require('./JSElement')

const ALLOWED_CHILDS = [
  'AssignmentPattern',
  'Identifier',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement',
  'Null'
]

/**
 * ArrayPattern
 *
 * @class ArrayPattern
 * @extends JSElement
 *
 * interface ArrayPattern {
 *   type: 'ArrayPattern';
 *   elements: ArrayPatternElement[];
 * }
 */
class ArrayPattern extends JSElement {
  constructor (ast) {
    super(ast)

    this.elements = this.createElementList(ast.elements, ALLOWED_CHILDS)
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write('[ ')
    buffer.loop(this.elements, ', ')
    buffer.write(' ]')
  }

  toESString (ctx) {
    return this.renderElement(
      '[ ' +
      ctx.join(this.elements, ', ') +
      ' ]'
    )
  }
}

module.exports = ArrayPattern
