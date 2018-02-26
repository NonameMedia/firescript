const FireScriptNode = require('./FireScriptNode')

const UNARY_OPERATORS = [
  '+', '-', '~', '!', 'delete', 'void', 'typeof'
]

/**
 * UnaryExpression
 *
 * @class UnaryExpression
 * @extends FireScriptNode
 *
 * interface UnaryExpression {
 *   type: 'UnaryExpression';
 *   operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
 *   argument: Expression;
 *   prefix: true;
 * }
 */
class UnaryExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()
    this.operator = token.value

    if (!UNARY_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a unary operator', token)
    }

    this.argument = this.createFullNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'UnaryExpression',
      operator: this.operator,
      argument: this.argument.toJSON(),
      prefix: true
    }
  }
}

module.exports = UnaryExpression
