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
    buffer.registerItem(this.location)
    buffer.loop(this.expressions, ', ')
    // buffer.write(';')
  }
}

module.exports = SequenceExpression
