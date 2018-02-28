const FireScriptNode = require('./FireScriptNode')

class SwitchStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'switch')) {
      this.syntaxError('Unexpected token, switch keyword expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.discriminant = this.createFullNode(tokenStack)

    if (!tokenStack.expect('indention')) {
      this.syntaxError('Unexpected token')
    }

    this.indention = tokenStack.getIndention()
    tokenStack.goForward()

    this.cases = []
    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
        break
      }

      if (nextToken.type === 'indention' && nextToken.value < this.indention) {
        tokenStack.goForward()
        break
      }

      this.cases.push(this.createSwitchCaseNode(tokenStack))
      if (tokenStack.getIndention() === this.indention) {
        continue
      }

      break
    }
  }

  toJSON () {
    return {
      type: 'SwitchStatement',
      discriminant: this.discriminant.toJSON(),
      cases: this.cases.map((item) => item.toJSON())
    }
  }
}

module.exports = SwitchStatement
