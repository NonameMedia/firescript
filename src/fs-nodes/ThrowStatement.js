const FireScriptNode = require('./FireScriptNode')

/**
 * ThrowStatement
 *
 * @class ThrowStatement
 * @extends FireScriptNode
 *
 * interface ThrowStatement {
 *   type: 'ThrowStatement';
 *   argument: Expression;
 * }
 */
class ThrowStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'throw')) {
      this.syntaxError('Unexpected token, throw keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.argument = this.createFullNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ThrowStatement',
      argument: this.argument.toJSON()
    }
  }
}

module.exports = ThrowStatement
