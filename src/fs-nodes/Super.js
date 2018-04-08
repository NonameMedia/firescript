const FireScriptNode = require('./FireScriptNode')

class Super extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

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
