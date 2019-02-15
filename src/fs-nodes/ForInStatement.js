const FirescriptNode = require('./FirescriptNode')

class ForInStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'for')) {
      this.syntaxError('Unexpected token! For-of statement expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.left = this.createVariableDeclarationNode(tokenStack, 'const')

    if (!tokenStack.expect('identifier', 'in')) {
      this.syntaxError('Unexpected token!', tokenStack.current())
    }

    tokenStack.goForward()
    this.right = this.createFullNode(tokenStack)

    this.body = this.createBlockStatementNode(tokenStack)
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ForInStatement',
      left: this.left.toJSON(ctx),
      right: this.right.toJSON(ctx),
      body: this.body.toJSON(ctx)
    })
  }
}

module.exports = ForInStatement
