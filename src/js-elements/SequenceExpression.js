const JSElement = require('./JSElement')

/**
 * SequenceExpression
 *
 * @class SequenceExpression
 * @extends JSElement
 *
 * interface SequenceExpression {
    type: 'SequenceExpression';
    expressions: Expression[];
}
*/
class SequenceExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.expressions = this.createElementList(ast.expressions)
  }

  compile (buffer) {
    buffer.loop(this.expressions, ', ')
  }
}

module.exports = SequenceExpression
