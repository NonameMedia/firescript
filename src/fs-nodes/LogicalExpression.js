const FirescriptNode = require('./FirescriptNode')

const LOGICAL_OPERATORS = ['||', '&&']
/**
 * LogicalExpression
 *
 * @class LogicalExpression
 * @extends FirescriptNode
 *
 * interface LogicalExpression {
 *   type: 'LogicalExpression';
 *   operator: '||' | '&&';
 *   left: Expression;
 *   right: Expression;
 * }
 */
class LogicalExpression extends FirescriptNode {
  constructor (tokenStack, parent, left) {
    super(tokenStack, parent)

    this.left = left || this.createNodeItem(tokenStack)

    if (!tokenStack.expect('operator', LOGICAL_OPERATORS)) {
      this.syntaxError('Token is not a logical operator', tokenStack.current())
    }

    const token = tokenStack.next()
    this.operator = token.value
    this.right = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'LogicalExpression',
      operator: this.operator,
      left: this.left.toJSON(),
      right: this.right.toJSON()
    })
  }
}

module.exports = LogicalExpression
