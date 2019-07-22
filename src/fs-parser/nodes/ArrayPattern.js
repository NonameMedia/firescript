const Node = require('./Node')

const ALLOWED_ELEMENTS = [
  'AssignmentPattern',
  'Identifier',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement',
  'Null'
]

class ArrayPattern extends Node {
  constructor (parser) {
    super(parser)

    this.elements = []

    for (const scope of parser.walkScope()) {
      const node = scope.nextNode(this)
      this.isAllowedNode(node, ALLOWED_ELEMENTS)
      this.elements.push(node)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ArrayPattern',
      elements: this.elements.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = ArrayPattern
