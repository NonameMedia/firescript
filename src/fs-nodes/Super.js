const FirescriptNode = require('./FirescriptNode')

class Super extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('identifier', 'super')) {
      this.syntaxError(`Unexpectrd token, super keyword expected`, tokenStack.current())
    }

    tokenStack.goForward()
  }

  toJSON () {
    return this.createJSON({
      type: 'Super'
    })
  }
}

module.exports = Super
