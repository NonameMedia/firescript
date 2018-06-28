const FirescriptNode = require('./FirescriptNode')

class Identifier extends FirescriptNode {
  constructor (tokenStack, parent, name) {
    super(tokenStack, parent)

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
    return this.createJSON({
      type: 'Identifier',
      name: this.name
    })
  }
}

module.exports = Identifier
