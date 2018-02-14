const FireScriptNode = require('./FireScriptNode')

class VariableDeclarator extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (this.parent.type !== 'VariableDeclaration') {
      this.syntaxError('Parser error! VariableDeclaration expected but is ' + this.parent.type)
    }

    // TODO support binding patterns
    this.id = this.createIdentifierNode(tokenStack)

    if (tokenStack.expect('operator', '=')) {
      tokenStack.goForward()
      this.init = this.createFullNode(tokenStack)
      console.log('INIT', this.init)
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
