const Node = require('./Node')

class FirescriptGrouping extends Node {
  constructor (parser, name) {
    super(parser)

    this.elements = []

    for (const scope of parser.walkScope()) {
      scope.print()
      this.elements.push(scope.nextNode(this))
    }
  }

  resolve (ctx) {
    return this.elements.length ? this.elements[0].resolve(ctx) : null
  }
}

module.exports = FirescriptGrouping
