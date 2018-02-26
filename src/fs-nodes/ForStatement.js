const FireScriptNode = require('./FireScriptNode')

class ForStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'for')) {
      this.syntaxError('Unexpected token! For statement expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.init = this.createFullNode(tokenStack)

    if (!tokenStack.expect('punctuator', ';')) {
      this.syntaxError('Unexpected token!', tokenStack.current())
    }

    tokenStack.goForward()
    this.test = this.createFullNode(tokenStack)

    if (!tokenStack.expect('punctuator', ';')) {
      this.syntaxError('Unexpected token!', tokenStack.current())
    }

    tokenStack.goForward()
    this.update = this.createFullNode(tokenStack)

    this.body = this.createBlockStatementNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ForStatement',
      init: this.init.toJSON(),
      test: this.test.toJSON(),
      update: this.update.toJSON(),
      body: this.body.toJSON()
    }
  }
}

module.exports = ForStatement
