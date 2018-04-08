const FireScriptNode = require('./FireScriptNode')

class IfStatement extends FireScriptNode {
  constructor (tokenStack, parent, test) {
    super(parent)

    if (test) {
      this.test = test
    } else {
      if (!tokenStack.expect('keyword', 'if')) {
        this.syntaxError('Unexpected token! If statement expected', tokenStack.current())
      }

      tokenStack.goForward()
      this.test = this.createFullNode(tokenStack)
    }

    this.consequent = this.createFullNode(tokenStack)

    if (tokenStack.expect('keyword', 'elif')) {
      tokenStack.goForward()
      const test = this.createFullNode(tokenStack)

      this.alternate = this.createIfStatementNode(tokenStack, test)
    }

    if (tokenStack.expect('keyword', 'else')) {
      tokenStack.goForward()
      this.alternate = this.createFullNode(tokenStack)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'IfStatement',
      test: this.test.toJSON(),
      consequent: this.consequent.toJSON(),
      alternate: this.alternate ? this.alternate.toJSON() : null
    })
  }
}

module.exports = IfStatement
