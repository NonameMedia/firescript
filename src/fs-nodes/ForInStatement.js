const FireScriptNode = require('./FireScriptNode')

class ForInStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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

    this.body = this.createBlockStatement(tokenStack)
  }

  toJSON () {
    return {
      type: 'ForInStatement',
      left: this.left.toJSON(),
      right: this.right.toJSON(),
      body: this.body.toJSON()
    }
  }
}

module.exports = ForInStatement
