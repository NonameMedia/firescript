const FirescriptNode = require('./FirescriptNode')

/**
 * YieldExpression
 *
 * @class YieldExpression
 * @extends FirescriptNode
 *
 * interface YieldExpression {
 *   type: 'YieldExpression';
 *   argument: Expression | null;
 *   delegate: boolean;
 * }
 */
class YieldExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'yield')) {
      this.syntaxError('Unexpected token, yield keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.delegate = false
    if (tokenStack.expect('operator', '*')) {
      this.delegate = true
      tokenStack.goForward()
    }

    this.argument = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'YieldExpression',
      argument: this.argument.toJSON(),
      delegate: this.delegate
    })
  }
}

module.exports = YieldExpression
