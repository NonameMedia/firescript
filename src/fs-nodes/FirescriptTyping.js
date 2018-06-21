const FireScriptNode = require('./FireScriptNode')

class FirescriptTyping extends FireScriptNode {
  constructor (tokenStack, parent, name) {
    super(tokenStack, parent)

    if (name) {
      this.name = name
    } else {
      if (!tokenStack.expect('identifier')) {
        this.syntaxError('Unexpected Token! FirescriptTyping expected', tokenStack.current())
      }

      const token = tokenStack.next()
      this.name = token.value
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'FirescriptTyping',
      name: this.name
    })
  }
}

module.exports = FirescriptTyping
