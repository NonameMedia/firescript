const Node = require('./Node')

class Identifier extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('identifier')) {
      this.syntaxError('Unexpected Token! Identifier expected')
    }

    const token = parser.nextToken()
    this.name = token.value
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'Identifier',
      name: this.name
    })
  }
}

module.exports = Identifier
