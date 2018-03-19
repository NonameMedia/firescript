const JSElement = require('./JSElement')

/**
 * ThisExpression
 *
 * @class ThisExpression
 * @extends JSElement
 *
 * interface ThisExpression {
    type: 'ThisExpression';
}
*/
class ThisExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ThisExpression is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ThisExpression
