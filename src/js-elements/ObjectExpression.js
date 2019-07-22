const JSElement = require('./JSElement')

const ALLOWED_NODES = [ 'Property' ]
/**
 * ObjectExpression
 *
 * @class ObjectExpression
 * @extends JSElement
 *
 * interface ObjectExpression {
 *   type: 'ObjectExpression';
 *   properties: Property[];
 * }
*/
class ObjectExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.properties = this.createElementList(ast.properties, ALLOWED_NODES, 1)
  }

  compile (buffer) {
    const multiline = this.useMultiline()
    buffer.write('{')
    if (multiline) {
      buffer.indent(1)
      buffer.loop(this.properties, `,${buffer.getIndent()}`)
      buffer.indent(-1)
    } else {
      const braceSpacing = this.properties.length ? ' ' : ''
      buffer.write(braceSpacing)
      buffer.loop(this.properties, `, `)
      buffer.write(braceSpacing)
    }

    buffer.write('}')
  }

  useMultiline () {
    return this.properties.length > 2 || this.properties.some((item) => !/Literal|Identifier/.test(item.value.type))
  }
}

module.exports = ObjectExpression
