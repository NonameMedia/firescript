const FirescriptElement = require('./FirescriptElement')

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
 * @extends FirescriptElement
 *
 * interface ArrayPattern {
 *   type: 'ArrayPattern';
 *   elements: ArrayPatternElement[];
 * }
 */
class ArrayPattern extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.elements = this.createElementList(ast.elements, ALLOWED_CHILDS)
  }

  toFSString (ctx) {
    return this.renderElement(
      '[ ' +
      ctx.join(this.elements, ', ') +
      ' ]'
    )
  }
}

module.exports = ArrayPattern
