const FirescriptElement = require('./FirescriptElement')

/**
 * ObjectPattern
 *
 * @class ObjectPattern
 * @extends FirescriptElement
 *
 * interface ObjectPattern {
 *   type: 'ObjectPattern';
 *   properties: Property[];
 * }
 */
class ObjectPattern extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.properties = this.createElementList(ast.properties)
  }

  toFSString (ctx) {
    return this.renderElement(
      '{ ' +
      ctx.join(this.properties, ', ') +
      ' }'
    )
  }
}

module.exports = ObjectPattern
