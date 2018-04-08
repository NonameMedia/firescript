const FireScriptNode = require('./FireScriptNode')

/**
 * ContinueStatement
 *
 * @class ContinueStatement
 * @extends FireScriptNo
 *
 * interface ContinueStatement {
 *   type: 'ContinueStatement';
 *   label: Identifier | null;
 * }
 */
class ContinueStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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

  toJSON () {
    return this.createJSON({
      type: 'ContinueStatement',
      label: this.label ? this.label.toJSON() : null
    })
  }
}

module.exports = ContinueStatement
