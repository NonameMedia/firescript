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

  toESString (ctx) {
    const useMultiline = this.useMultiline()
    if (useMultiline) {
      return this.renderMultiline(ctx)
    }

    return this.renderInline(ctx)
  }

  useMultiline () {
    return this.properties.length > 2 || this.properties.some((item) => !/Literal|Identifier/.test(item.value.type))
  }

  renderMultiline (ctx) {
    return '{' +
      ctx.indent(+1) +
      ctx.join(this.properties, `,${ctx.indent()}`) +
      ctx.indent(-1) +
      '}'
  }

  renderInline (ctx) {
    const braceSpacing = this.properties.length ? ' ' : ''
    return this.renderElement(
      '{' +
      braceSpacing +
      ctx.join(this.properties, ', ') +
      braceSpacing +
      '}'
    )
  }
}

module.exports = ObjectExpression
