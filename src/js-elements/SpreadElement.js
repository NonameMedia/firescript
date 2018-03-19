const JSElement = require('./JSElement')

/**
 * SpreadElement
 *
 * @class SpreadElement
 * @extends JSElement
 *
 * interface SpreadElement {
    type: 'SpreadElement';
    argument: Expression;
}
*/
class SpreadElement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element SpreadElement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = SpreadElement
