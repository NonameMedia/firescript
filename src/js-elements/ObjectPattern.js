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
    buffer.write('{ ')
    buffer.loop(this.properties, `, `)
    buffer.write(' }')
  }
}

module.exports = ObjectPattern
