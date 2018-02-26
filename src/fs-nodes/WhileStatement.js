const FireScriptNode = require('./FireScriptNode')

class WhileStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'while')) {
      this.syntaxError('Unexpected token! While statement expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.test = this.createFullNode(tokenStack)
    this.body = this.createBlockStatementNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'WhileStatement',
      test: this.test.toJSON(),
      body: this.body.toJSON()
    }
  }
}

module.exports = WhileStatement
