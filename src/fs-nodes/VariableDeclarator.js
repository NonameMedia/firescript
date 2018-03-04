const FireScriptNode = require('./FireScriptNode')

class VariableDeclarator extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    // TODO support binding patterns
    this.id = this.createIdentifierNode(tokenStack)

    if (tokenStack.expect('operator', '=')) {
      tokenStack.goForward()
      if (this.tryObject(tokenStack)) {
        this.init = this.createObjectExpressionNode(tokenStack)
      } else {
        this.init = this.createFullNode(tokenStack)
      }
    }
  }

  tryObject (tokenStack) {
    return tokenStack.expect('indention') &&
      tokenStack.lookForward('identifier', null, 1) &&
      tokenStack.lookForward('punctuator', ':', 2)
  }

  toJSON () {
    return {
      type: 'VariableDeclarator',
      id: this.id.toJSON(),
      init: this.init ? this.init.toJSON() : null
    }
  }
}

module.exports = VariableDeclarator
