const FireScriptNode = require('./FireScriptNode')

class Identifier extends FireScriptNode {
  constructor (tokenStack, parent, name) {
    super(parent)

    if (name) {
      this.name = name
    } else {
      if (!tokenStack.expect('identifier')) {
        this.syntaxError('Unexpected Token! Identifier expected', tokenStack.current())
      }

      const token = tokenStack.next()
      this.name = token.value
    }
  }

  toJSON () {
    return {
      type: 'Identifier',
      name: this.name
    }
  }
}

module.exports = Identifier
