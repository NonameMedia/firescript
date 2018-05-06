const FireScriptElement = require('./FireScriptElement')

/**
 * ArrayExpression
 *
 * @class ArrayExpression
 * @extends FireScriptElement
 *
 * interface ArrayExpression {
 *   type: 'ArrayExpression';
 *   elements: ArrayExpressionElement[];
 * }
 */
class ArrayExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.elements = this.createElementList(ast.elements)
  }

  toFSString (ctx) {
    if (this.isParent('Property')) {
      this.multilineEnabled = this.parent.parent.multilineEnabled
    } else {
      this.multilineEnabled = this.elements.length > 2 || this.elements.some((item) => !/Literal|Identifier/.test(item.type))
    }

    if (this.multilineEnabled) {
      return this.renderElement(this.renderMultiline(ctx))
    } else {
      return this.renderElement(this.renderInline(ctx))
    }
  }

  useMultiline () {
    return this.elements.length > 2 || this.elements.some((item) => item.method)
  }

  renderMultiline (ctx) {
    const indention = ctx.indent(1)
    const elements = ctx.join(this.elements, ctx.indent())
    const outdent = ctx.indent(-1)

    return '[' +
      indention +
      elements.trim() +
      outdent +
      ']'
  }

  renderInline (ctx) {
    return '[ ' +
      ctx.join(this.elements, ', ') +
      ' ]'
  }
}

module.exports = ArrayExpression
