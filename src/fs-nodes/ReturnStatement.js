const FireScriptNode = require('./FireScriptNode')

class ReturnStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.shift()

    if (token.value !== 'return') {
      this.syntaxError('Unexpected token', token)
    }

    console.log('TYPE', tokenStack[0])
    this.argument = this.createNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ReturnStatement',
      argument: this.argument
    }
  }
}

module.exports = ReturnStatement
