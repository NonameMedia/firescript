const FireScriptNode = require('./FireScriptNode')

class ReturnStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    const token = tokenStack.next()

    if (token.value !== 'return') {
      this.syntaxError('Unexpected token', token)
    }

    this.argument = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ReturnStatement',
      argument: this.argument.toJSON()
    })
  }
}

module.exports = ReturnStatement
