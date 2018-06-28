const FirescriptNode = require('./FirescriptNode')

class WhileStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'while')) {
      this.syntaxError('Unexpected token! While statement expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.test = this.createFullNode(tokenStack)
    this.body = this.createBlockStatementNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'WhileStatement',
      test: this.test.toJSON(),
      body: this.body.toJSON()
    })
  }
}

module.exports = WhileStatement
