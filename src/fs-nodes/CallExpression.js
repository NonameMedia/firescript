const FireScriptNode = require('./FireScriptNode')

class CallExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.callee = this.createIdentifierNode(tokenStack)
    this.arguments = []

    if (!tokenStack.expect('punctuator', '(')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    while (true) {
      if (tokenStack.expect('punctuator', ')')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      this.arguments.push(this.createNode(tokenStack))
    }
  }

  toJSON () {
    return {
      type: 'CallExpression',
      callee: this.callee.toJSON(),
      arguments: this.arguments.map((item) => item.toJSON())
    }
  }
}

module.exports = CallExpression
