const FireScriptNode = require('./FireScriptNode')

class VariableDeclarator extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    // TODO support binding patterns
    this.id = this.createIdentifierNode(tokenStack)

    if (tokenStack.expect('operator', '=')) {
      tokenStack.goForward()
      this.init = this.createFullNode(tokenStack)
    }
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
