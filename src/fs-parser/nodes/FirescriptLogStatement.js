const Node = require('./Node')

class FirescriptLogStatement extends Node {
  constructor (parser, name) {
    super(parser)

    if (!parser.match('keyword', 'log')) {
      this.syntaxError('Unexpected Token! FirescriptLogStatement expected')
    }

    parser.skipNext()

    this.arguments = []
    for (const scope of parser.walkScope()) {
      const expression = scope.nextNode(this)
      this.arguments.push(expression)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'FirescriptLogStatement',
      arguments: this.arguments.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = FirescriptLogStatement
