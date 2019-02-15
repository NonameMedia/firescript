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

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'WhileStatement',
      test: this.test.toJSON(ctx),
      body: this.body.toJSON(ctx)
    })
  }
}

module.exports = WhileStatement
