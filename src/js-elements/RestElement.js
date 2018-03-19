const JSElement = require('./JSElement')

/**
 * RestElement
 *
 * @class RestElement
 * @extends JSElement
 *
 * interface RestElement {
    type: 'RestElement';
    argument: Identifier | BindingPattern;
}
*/
class RestElement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element RestElement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = RestElement
