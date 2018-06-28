const FirescriptNode = require('./FirescriptNode')
const constants = require('../utils/constants')

/**
 * UnaryExpression
 *
 * @class UnaryExpression
 * @extends FirescriptNode
 *
 * interface UnaryExpression {
 *   type: 'UnaryExpression';
 *   operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
 *   argument: Expression;
 *   prefix: true;
 * }
 */
class UnaryExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    const token = tokenStack.next()
    this.operator = token.value

    if (!constants.UNARY_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a unary operator', token)
    }

    this.argument = this.createNodeItem(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'UnaryExpression',
      operator: this.operator,
      argument: this.argument.toJSON(),
      prefix: true
    })
  }
}

module.exports = UnaryExpression
