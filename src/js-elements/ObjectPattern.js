const JSElement = require('./JSElement')

/**
 * ObjectPattern
 *
 * @class ObjectPattern
 * @extends JSElement
 *
 * interface ObjectPattern {
 *   type: 'ObjectPattern';
 *   properties: Property[];
 * }
 */
class ObjectPattern extends JSElement {
  constructor (ast) {
    super(ast)

    this.properties = this.createElementList(ast.properties)
  }

  compile (buffer) {
    // buffer.registerItem(this.location, this.id)

    buffer.write('{ ')
    buffer.loop(this.properties, `, `)
    buffer.write(' }')
  }

  toESString (ctx) {
    return this.renderElement(
      '{ ' +
      ctx.join(this.properties, ', ') +
      ' }'
    )
  }
}

module.exports = ObjectPattern
