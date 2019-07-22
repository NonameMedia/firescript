const FirescriptElement = require('./FirescriptElement')

const ALLOWED_NODES = [ 'Property' ]
/**
 * ObjectExpression
 *
 * @class ObjectExpression
 * @extends FirescriptElement
 *
 * interface ObjectExpression {
 *   type: 'ObjectExpression';
 *   properties: Property[];
 * }
*/
class ObjectExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.properties = this.createElementList(ast.properties, ALLOWED_NODES, 1)
  }

  toFSString (ctx) {
    if (this.isParent('Property')) {
      this.multilineEnabled = this.parent.parent.multilineEnabled
    } else {
      this.multilineEnabled = this.properties.length > 2 || this.properties.some((item) => !/Literal|Identifier/.test(item.value.type))
    }

    if (this.multilineEnabled) {
      return this.renderMultiline(ctx)
    }

    return this.renderInline(ctx)
  }

  renderMultiline (ctx) {
    let indention = ctx.indent(+1)
    const properties = ctx.join(this.properties, `${ctx.indent()}`)
    let outdent = ctx.indent(-1)

    if (this.isParent(['ArrayExpression'])) {
      indention = this.getIndention(1)
      outdent = ''
    }

    if (this.isParent(['Property'])) {
      outdent = ''
    }

    return indention +
      properties.trim() +
      outdent
  }

  renderInline (ctx) {
    return this.renderElement(
      '{ ' +
      ctx.join(this.properties, ', ') +
      ' }'
    )
  }
}

module.exports = ObjectExpression
