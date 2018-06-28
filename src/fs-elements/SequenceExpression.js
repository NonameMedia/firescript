const FirescriptElement = require('./FirescriptElement')

/**
 * SequenceExpression
 *
 * @class SequenceExpression
 * @extends FirescriptElement
 *
 * interface SequenceExpression {
    type: 'SequenceExpression';
    expressions: Expression[];
}
*/
class SequenceExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element SequenceExpression is a DraftElement!`)
  }

  toString () {
    return this.renderElement(
      `${this.callee}(${this.arguments.join(', ')});`
    )
  }
}

module.exports = SequenceExpression
