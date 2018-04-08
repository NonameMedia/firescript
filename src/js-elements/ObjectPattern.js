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

  toESString (ctx) {
    return this.renderElement(
      '{ ' +
      ctx.join(this.properties, ', ') +
      ' }'
    )
  }
}

module.exports = ObjectPattern
