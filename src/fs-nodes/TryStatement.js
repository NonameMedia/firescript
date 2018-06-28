const FirescriptNode = require('./FirescriptNode')

/**
 * TryStatement
 *
 * @class TryStatement
 * @extends FirescriptNode
 *
 * interface TryStatement {
 *     type: 'TryStatement';
 *     block: BlockStatement;
 *     handler: CatchClause | null;
 *     finalizer: BlockStatement | null;
 * }
 */
class TryStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'try')) {
      this.syntaxError('Unexpected token, try keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.block = this.createBlockStatementNode(tokenStack)
    this.handler = this.createCatchClauseNode(tokenStack)
    if (tokenStack.expect('keyword', 'finally')) {
      tokenStack.goForward()
      this.handler = this.createBlockStatementNode(tokenStack)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'TryStatement',
      block: this.block.toJSON(),
      handler: this.handler ? this.handler.toJSON() : null,
      finalizer: this.finalizer ? this.finalizer.toJSON() : null
    })
  }
}

module.exports = TryStatement
