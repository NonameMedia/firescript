const FireScriptNode = require('./FireScriptNode')

class CallExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.callee = this.createIdentifierNode(tokenStack)
    this.arguments = []

    let token = tokenStack.shift()

    if (token.type !== 'punctuator' && token.value !== '(') {
      this.syntaxError('Unexpected token', token)
    }

    while (true) {
      if (this.lookForward(tokenStack, 'punctuator', ')')) {
        token = tokenStack.shift()
        break
      }

      if (this.lookForward(tokenStack, 'punctuator', ',')) {
        token = tokenStack.shift()
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
