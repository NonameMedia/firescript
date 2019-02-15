const FirescriptNode = require('./FirescriptNode')

class ReturnStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    const token = tokenStack.next()

    if (token.value !== 'return') {
      this.syntaxError('Unexpected token', token)
    }

    this.argument = this.createFullNode(tokenStack)

    this.tearDown()
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ReturnStatement',
      argument: this.argument.toJSON(ctx)
    })
  }
}

module.exports = ReturnStatement
