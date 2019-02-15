const FirescriptNode = require('./FirescriptNode')

class FirescriptTyping extends FirescriptNode {
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

    this.tearDown()
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'FirescriptTyping',
      name: this.name
    })
  }
}

module.exports = FirescriptTyping
