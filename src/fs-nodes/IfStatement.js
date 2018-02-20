const FireScriptNode = require('./FireScriptNode')

class IfStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'if')) {
      this.syntaxError('Unexpected token! If statement expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.test = this.createFullNode(tokenStack)
    this.consequent = this.createBlockStatement(tokenStack)

    if (tokenStack.expect('keyword', 'else')) {
      tokenStack.goForward()
      this.alternate = this.createFullNode(tokenStack)
    }
  }

  toJSON () {
    return {
      type: 'IfStatement',
      test: this.test.toJSON(),
      consequent: this.consequent.toJSON(),
      alternate: this.alternate ? this.alternate.toJSON() : null
    }
  }
}

module.exports = IfStatement
