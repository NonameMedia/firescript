const FirescriptNode = require('./FirescriptNode')

/**
 * AwaitExpression
 *
 * @class AwaitExpression
 * @extends FirescriptNode
 *
 * interface AwaitExpression {
 *   type: 'AwaitExpression';
 *   argument: Expression | null;
 * }
 */
class AwaitExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'await')) {
      this.syntaxError('Unexpected token, await keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.argument = this.createFullNode(tokenStack)
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'AwaitExpression',
      argument: this.argument.toJSON(ctx)
    })
  }
}

module.exports = AwaitExpression
