const FirescriptNode = require('./FirescriptNode')

/**
 * ThrowStatement
 *
 * @class ThrowStatement
 * @extends FirescriptNode
 *
 * interface ThrowStatement {
 *   type: 'ThrowStatement';
 *   argument: Expression;
 * }
 */
class ThrowStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'throw')) {
      this.syntaxError('Unexpected token, throw keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.argument = this.createFullNode(tokenStack)
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ThrowStatement',
      argument: this.argument.toJSON(ctx)
    })
  }
}

module.exports = ThrowStatement
