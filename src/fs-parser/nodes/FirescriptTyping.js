const Node = require('./Node')

class FirescriptTyping extends Node {
  constructor (parser, name) {
    super(parser)

    if (name) {
      this.name = name
    } else {
      if (!parser.match('identifier')) {
        this.syntaxError('Unexpected Token! FirescriptTyping expected')
      }

      const token = parser.nextToken()
      this.name = token.value
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'FirescriptTyping',
      name: this.name
    })
  }
}

module.exports = FirescriptTyping
