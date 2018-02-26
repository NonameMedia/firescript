const FireScriptNode = require('./FireScriptNode')

/**
 * TryStatement
 *
 * @class TryStatement
 * @extends FireScriptNode
 *
 * interface TryStatement {
 *     type: 'TryStatement';
 *     block: BlockStatement;
 *     handler: CatchClause | null;
 *     finalizer: BlockStatement | null;
 * }
 */
class TryStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'try')) {
      this.syntaxError('Unexpected token, try keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.body = this.createBlockStatementNode(tokenStack)
    this.handler = this.createCatchClause(tokenStack)
    if (tokenStack.expect('keyword', 'finally')) {
      tokenStack.goForward()
      this.handler = this.createBlockStatementNode(tokenStack)
    }
  }

  toJSON () {
    return {
      type: 'TryStatement',
      body: this.body.toJSON(),
      handler: this.handler ? this.handler.toJSON() : null,
      finalizer: this.finalizer ? this.finalizer.toJSON() : null
    }
  }
}

module.exports = TryStatement
