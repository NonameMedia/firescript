const JSElement = require('./JSElement')

/**
 * ConditionalExpression
 *
 * @class ConditionalExpression
 * @extends JSElement
 *
 * interface ConditionalExpression {
    type: 'ConditionalExpression';
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
}
*/
class ConditionalExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ConditionalExpression is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ConditionalExpression
