const JSElement = require('./JSElement')

/**
 * Super
 *
 * @class Super
 * @extends JSElement
 *
 * interface Super {
    type: 'Super';
}
*/
class Super extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element Super is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = Super
