const FireScriptNode = require('./FireScriptNode')

/**
 * YieldExpression
 *
 * @class YieldExpression
 * @extends FireScriptNode
 *
 * interface YieldExpression {
 *   type: 'YieldExpression';
 *   argument: Expression | null;
 *   delegate: boolean;
 * }
 */
class YieldExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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
