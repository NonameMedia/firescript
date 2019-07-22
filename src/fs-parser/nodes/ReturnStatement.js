const Node = require('./Node')

class ReturnStatement extends Node {
  constructor (parser) {
    super(parser)

    const token = parser.getKeyword()

    if (token.value !== 'return') {
      this.syntaxError('Unexpected token', token)
    }

    this.argument = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ReturnStatement',
      argument: this.argument.resolve(ctx)
    })
  }
}

module.exports = ReturnStatement
