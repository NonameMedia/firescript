const Node = require('./Node')

const LOGICAL_OPERATORS = ['||', '&&']
/**
 * LogicalExpression
 *
 * @class LogicalExpression
 * @extends Node
 *
 * interface LogicalExpression {
 *   type: 'LogicalExpression';
 *   operator: '||' | '&&';
 *   left: Expression;
 *   right: Expression;
 * }
 */
class LogicalExpression extends Node {
  constructor (parser, left) {
    super(parser)

    this.left = left || parser.nextRealNode(this)

    if (!parser.match('operator', LOGICAL_OPERATORS)) {
      this.syntaxError('Token is not a logical operator')
    }

    const token = parser.nextToken()
    this.operator = token.value
    this.right = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'LogicalExpression',
      operator: this.operator,
      left: this.left.resolve(ctx),
      right: this.right.resolve(ctx)
    })
  }
}

module.exports = LogicalExpression
