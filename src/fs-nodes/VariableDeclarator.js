const FireScriptNode = require('./FireScriptNode')

class VariableDeclarator extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    // TODO support binding patterns
    if (tokenStack.expect('punctuator', '[')) {
      this.id = this.createArrayPatternNode(tokenStack)
    } else {
      this.id = this.createIdentifierNode(tokenStack)
    }

    if (tokenStack.expect('operator', '=')) {
      tokenStack.goForward()

      if (tokenStack.expect('indention')) {
        const objectExpressionNode = this.tryObjectExpression(tokenStack)
        if (objectExpressionNode) {
          this.init = objectExpressionNode
        } else {
          const arrayExpressionNode = this.tryArrayExpression(tokenStack)
          if (arrayExpressionNode) {
            this.init = arrayExpressionNode
          } else {
            this.syntaxError('Unexpected token!', tokenStack.current())
          }
        }
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

  tryArray (tokenStack) {
    return tokenStack.expect('indention') &&
      tokenStack.lookForward('identifier', null, 1) &&
      tokenStack.lookForward('punctuator', ':', 2)
  }

  toJSON () {
    return this.createJSON({
      type: 'VariableDeclarator',
      id: this.id.toJSON(),
      init: this.init ? this.init.toJSON() : null
    })
  }
}

module.exports = VariableDeclarator
