const JSElement = require('./JSElement')

/**
 * ObjectExpression
 *
 * @class ObjectExpression
 * @extends JSElement
 *
 * interface ObjectExpression {
    type: 'ObjectExpression';
    properties: Property[];
}
*/
class ObjectExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ObjectExpression is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ObjectExpression
