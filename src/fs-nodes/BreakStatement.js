const FirescriptNode = require('./FirescriptNode')

/**
 * BreakStatement
 *
 * @class BreakStatement
 * @extends FirescriptNode
 *
 * interface BreakStatement {
 *   type: 'BreakStatement';
 *   label: Identifier | null;
 * }
 */
class BreakStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'break')) {
      this.syntaxError('Unexpected token, BreakStatement expected', tokenStack.current())
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
      type: 'BreakStatement',
      label: this.label ? this.label.toJSON(ctx) : null
    })
  }
}

module.exports = BreakStatement
