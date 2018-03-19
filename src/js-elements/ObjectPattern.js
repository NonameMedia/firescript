const JSElement = require('./JSElement')

/**
 * ObjectPattern
 *
 * @class ObjectPattern
 * @extends JSElement
 *
 * interface ObjectPattern {
    type: 'ObjectPattern';
    properties: Property[];
}
*/
class ObjectPattern extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ObjectPattern is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ObjectPattern
