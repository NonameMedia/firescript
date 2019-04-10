const Node = require('./Node')

class Identifier extends Node {
  constructor (parser, token) {
    super(parser, token)

    if (token && token.value) {
      this.name = token.value
    } else {
      // if (tokenStack.expect('operator', ['delete', 'void', 'typeof'])) {
      //   tokenStack.changeType('identifier')
      // }

      if (!parser.expect('identifier')) {
        this.syntaxError('Unexpected Token! Identifier expected')
      }

      const token = parser.nextToken()
      this.name = token.value

      this.tearDown()
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'Identifier',
      name: this.name
    })
  }
}

module.exports = Identifier
