const Node = require('./Node')
const constants = require('../../utils/constants')

/**
 * UnaryExpression
 *
 * @class UnaryExpression
 * @extends Node
 *
 * interface UnaryExpression {
 *   type: 'UnaryExpression';
 *   operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
 *   argument: Expression;
 *   prefix: true;
 * }
 */
class UnaryExpression extends Node {
  constructor (parser) {
    super(parser)

    const token = parser.getOperator()
    this.operator = token.value

    if (!constants.UNARY_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a unary operator', token)
    }

    this.argument = parser.nextNode()
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'UnaryExpression',
      operator: this.operator,
      argument: this.argument.resolve(ctx),
      prefix: true
    })
  }
}

module.exports = UnaryExpression
