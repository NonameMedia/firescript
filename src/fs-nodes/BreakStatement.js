const FireScriptNode = require('./FireScriptNode')

/**
 * BreakStatement
 *
 * @class BreakStatement
 * @extends FireScriptNo
 *
 * interface BreakStatement {
 *   type: 'BreakStatement';
 *   label: Identifier | null;
 * }
 */
class BreakStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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

  toJSON () {
    return {
      type: 'BreakStatement',
      label: this.label ? this.label.toJSON() : null
    }
  }
}

module.exports = BreakStatement
