const Node = require('./Node')

class ArrayExpression extends Node {
  constructor (parser) {
    super(parser)

    this.elements = []

    if (parser.match('punctuator "]"')) {
      parser.skipNext()
      return
    }

    for (const scope of parser.walkScope()) {
      const node = scope.nextNode(this)
      this.elements.push(node)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ArrayExpression',
      elements: this.elements.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = ArrayExpression
