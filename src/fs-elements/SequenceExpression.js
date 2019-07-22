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

    this.expressions = this.createElementList(ast.expressions)
  }

  toFSString (ctx) {
    return this.renderElement(
      `${ctx.join(this.expressions, ', ')}`
    )
  }
}

module.exports = SequenceExpression
