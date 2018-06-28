const FirescriptNode = require('./FirescriptNode')

class SwitchStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    const token = tokenStack.next()

    if (token.value !== 'return') {
      this.syntaxError('Unexpected token', token)
    }

    this.discriminant = this.createFullNode(tokenStack)

    this.cases = []
    while (true) {

    }
  }

  toJSON () {
    return this.createJSON({
      type: 'SwitchStatement',
      discriminant: this.discriminant.toJSON(),
      cases: this.cases.map((item) => item.toJSON())
    })
  }
}

module.exports = SwitchStatement
