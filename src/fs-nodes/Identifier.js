const FireScriptNode = require('./FireScriptNode')

class Identifier extends FireScriptNode {
  constructor (tokenStack, parent, name) {
    super(parent)

    if (name) {
      this.name = name
    } else {
      const token = tokenStack.next()

      if (token.type !== 'identifier') {
        this.syntaxError(`Identifier expected, but a ${token.type} was given`, token)
      }

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
