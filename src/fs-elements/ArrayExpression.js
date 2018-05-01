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
    if (this.useMultiline()) {
      return this.renderElement(this.renderMultiline(ctx))
    } else {
      return this.renderElement(this.renderInline(ctx))
    }
  }

  useMultiline () {
    return this.elements.length > 2 || this.elements.some((item) => item.method)
  }

  renderMultiline (ctx) {
    return '[' +
      ctx.indent(1) +
      ctx.join(this.elements, ctx.indent()) +
      ctx.indent(-1) +
      ']'
  }

  renderInline (ctx) {
    return '[ ' +
      ctx.join(this.elements, ', ') +
      ' ]'
  }
}

module.exports = ArrayExpression
