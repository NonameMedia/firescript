const Node = require('./Node')

class ObjectExpression extends Node {
  constructor (parser, property) {
    super(parser)

    this.properties = []

    if (parser.match('punctuator "}"')) {
      parser.skipNext()
      return
    }

    for (const scope of parser.walkScope()) {
      const property = scope.createNode('Property')
      this.properties.push(property)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ObjectExpression',
      properties: this.properties.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = ObjectExpression
