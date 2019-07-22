const Node = require('./Node')

class ThisExpression extends Node {
  constructor (parser) {
    super(parser)

    const token = parser.nextToken()

    if (token.type !== 'identifier' && token.value !== 'this') {
      parser.syntaxError(`ThisExpression expected, but a ${token.type} was given`)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ThisExpression'
    })
  }
}

module.exports = ThisExpression
