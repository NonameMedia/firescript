const FirescriptNode = require('./FirescriptNode')

/**
 * DoWhileStatement
 *
 * @class DoWhileStatement
 * @extends FirescriptNode
 *
 * interface DoWhileStatement {
 *   type: 'DoWhileStatement';
 *   body: Statement;
 *   test: Expression;
 * }
 */
class DoWhileStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'do')) {
      this.syntaxError('Unexpected token! do keyword expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.body = this.createBlockStatementNode(tokenStack)

    if (!tokenStack.expect('keyword', 'while')) {
      this.syntaxError('Unexpected token! while keyword expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.test = this.createFullNode(tokenStack)
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'DoWhileStatement',
      test: this.test.toJSON(ctx),
      body: this.body.toJSON(ctx)
    })
  }
}

module.exports = DoWhileStatement
