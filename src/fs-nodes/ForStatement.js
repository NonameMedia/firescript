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

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ForStatement',
      init: this.init.toJSON(ctx),
      test: this.test.toJSON(ctx),
      update: this.update.toJSON(ctx),
      body: this.body.toJSON(ctx)
    })
  }
}

module.exports = ForStatement
