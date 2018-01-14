const FireScriptNode = require('./FireScriptNode')

class ReturnStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()

    if (token.value !== 'return') {
      this.syntaxError('Unexpected token', token)
    }

    this.argument = this.createNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ReturnStatement',
      argument: this.argument.toJSON()
    }
  }
}

module.exports = ReturnStatement
