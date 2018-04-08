const FireScriptNode = require('./FireScriptNode')

/**
 * DoWhileStatement
 *
 * @class DoWhileStatement
 * @extends FireScriptNode
 *
 * interface DoWhileStatement {
 *   type: 'DoWhileStatement';
 *   body: Statement;
 *   test: Expression;
 * }
 */
class DoWhileStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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

  toJSON () {
    return this.createJSON({
      type: 'DoWhileStatement',
      test: this.test.toJSON(),
      body: this.body.toJSON()
    })
  }
}

module.exports = DoWhileStatement
