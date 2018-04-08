const FireScriptNode = require('./FireScriptNode')

class SwitchStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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
