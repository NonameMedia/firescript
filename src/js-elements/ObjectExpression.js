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
    return this.properties.length > 2 || this.properties.some((item) => item.method)
  }

  renderMultiline (ctx) {
    return '{' +
      ctx.indent(+1) +
      ctx.join(this.properties, `,${ctx.indent()}`) +
      ctx.indent(-1) +
      '}'
  }

  renderInline (ctx) {
    return '{ ' +
      ctx.join(this.properties, ', ') +
      ' }'
  }
}

module.exports = ObjectExpression
