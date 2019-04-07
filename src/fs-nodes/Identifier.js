const FirescriptNode = require('./FirescriptNode')

class Identifier extends FirescriptNode {
  constructor (tokenStack, parent, name) {
    super(tokenStack, parent)

    if (name) {
      this.name = name
    } else {
      if (tokenStack.expect('operator', ['delete', 'void', 'typeof'])) {
        tokenStack.changeType('identifier')
      }

      if (!tokenStack.expect('identifier')) {
        this.syntaxError('Unexpected Token! Identifier expected', tokenStack.current())
      }

      const token = tokenStack.next()
      this.name = token.value

      this.tearDown()
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'Identifier',
      name: this.name
    })
  }
}

module.exports = Identifier
