const Node = require('./Node')

class ObjectPattern extends Node {
  constructor (parser, property) {
    super(parser)

    this.properties = []

    for (const scope of parser.walkScope()) {
      const property = scope.createNode('Property')
      this.properties.push(property)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ObjectPattern',
      properties: this.properties.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = ObjectPattern
