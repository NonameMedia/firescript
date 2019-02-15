const FirescriptNode = require('./FirescriptNode')

class FirescriptLogStatement extends FirescriptNode {
  constructor (tokenStack, parent, name) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'log')) {
      this.syntaxError('Unexpected Token! FirescriptLogStatement expected', tokenStack.current())
    }

    tokenStack.goForward()

    this.arguments = []
    while (true) {
      const expression = this.createFullNode(tokenStack)
      this.arguments.push(expression)

      if (tokenStack.isIndention('lte', this.indention)) {
        break
      }
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'FirescriptLogStatement',
      arguments: this.arguments.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = FirescriptLogStatement
