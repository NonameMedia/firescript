const Node = require('./Node')

class ObjectExpression extends Node {
  constructor (parser, property) {
    super(parser)

    this.properties = []

    for (const scope of parser.walkScope()) {
      const property = scope.createNode('Property')
      parser.print()
      this.properties.push(property)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ObjectExpression',
      properties: this.properties.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = ObjectExpression
