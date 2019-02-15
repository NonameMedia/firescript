const FirescriptNode = require('./FirescriptNode')

/**
 * ContinueStatement
 *
 * @class ContinueStatement
 * @extends FirescriptNo
 *
 * interface ContinueStatement {
 *   type: 'ContinueStatement';
 *   label: Identifier | null;
 * }
 */
class ContinueStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'continue')) {
      this.syntaxError('Unexpected token, ContinueStatement expected', tokenStack.current())
    }

    tokenStack.goForward()

    if (tokenStack.expect('identifier')) {
      this.lable = this.createIdentifierNode(tokenStack)
    } else {
      this.label = null
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ContinueStatement',
      label: this.label ? this.label.toJSON(ctx) : null
    })
  }
}

module.exports = ContinueStatement
