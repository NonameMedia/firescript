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

  toJSON () {
    return this.createJSON({
      type: 'FirescriptLogStatement',
      arguments: this.arguments.map((item) => item.toJSON())
    })
  }
}

module.exports = FirescriptLogStatement
