const FireScriptNode = require('./FireScriptNode')

class ClassExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.id = null
    this.superClass = null

    if (!tokenStack.expect('keyword', 'class')) {
      this.syntaxError('Unexpected token, class keyword expected', tokenStack.current())
    }

    tokenStack.goForward()

    if (tokenStack.expect('identifier')) {
      this.id = this.createIdentifierNode(tokenStack)
    }

    if (tokenStack.expect('keyword', 'extends')) {
      tokenStack.goForward()
      this.superClass = this.createIdentifierNode(tokenStack)
    }

    this.body = this.createClassBodyNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ClassExpression',
      body: this.body.map((item) => item.toJSON()),
      superClass: this.superClass ? this.superClass.toJSON() : null
    })
  }
}

module.exports = ClassExpression
