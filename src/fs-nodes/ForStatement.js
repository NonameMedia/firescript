const FirescriptNode = require('./FirescriptNode')

class ForStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'for')) {
      this.syntaxError('Unexpected token! For statement expected', tokenStack.current())
    }

    tokenStack.goForward()

    if (tokenStack.expect('identifier') && tokenStack.lookForward('operator', '=', 1)) {
      this.init = this.createVariableDeclarationNode(tokenStack, 'let')
    } else {
      this.init = this.createFullNode(tokenStack)
    }


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
    return this.createJSON({
      type: 'ForStatement',
      init: this.init.toJSON(),
      test: this.test.toJSON(),
      update: this.update.toJSON(),
      body: this.body.toJSON()
    })
  }
}

module.exports = ForStatement
