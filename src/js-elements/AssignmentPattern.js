const JSElement = require('./JSElement')

/**
 * AssignmentPattern
 *
 * @class AssignmentPattern
 * @extends JSElement
 *
 * interface AssignmentPattern {
    type: 'AssignmentPattern';
    left: Identifier | BindingPattern;
    right: Expression;
}
*/
class AssignmentPattern extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element AssignmentPattern is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = AssignmentPattern
