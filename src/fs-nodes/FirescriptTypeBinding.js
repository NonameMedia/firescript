const FireScriptNode = require('./FireScriptNode')

class FirescriptTypeBinding extends FireScriptNode {
  constructor (tokenStack, parent, type) {
    super(tokenStack, parent)

    if (type) {
      this.name = type
    } else {
      if (!tokenStack.expect('identifier')) {
        this.syntaxError('Unexpected Token! FirescriptTypeBinding expected', tokenStack.current())
      }

      const token = tokenStack.next()
      this.name = token.value
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'FirescriptTypeBinding',
      name: this.name
    })
  }
}

module.exports = FirescriptTypeBinding
