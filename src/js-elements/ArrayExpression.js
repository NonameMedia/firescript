const JSElement = require('./JSElement')

/**
 * ArrayExpression
 *
 * @class ArrayExpression
 * @extends JSElement
 *
 * interface ArrayExpression {
 *   type: 'ArrayExpression';
 *   elements: ArrayExpressionElement[];
 * }
 */
class ArrayExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.elements = this.createElementList(ast.elements)
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    if (this.useMultiline()) {
      buffer.write('[')
      buffer.indent(1)
      buffer.loop(this.elements, ',' + buffer.getIndent())
      buffer.indent(-1)
      buffer.write(']')
    } else {
      buffer.write('[ ')
      buffer.loop(this.elements, ', ')
      buffer.write(' ]')
    }
  }

  toESString (ctx) {
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
      ctx.join(this.elements, ',' + ctx.indent()) +
      ctx.indent(-1) +
      ']'
  }

  renderInline (ctx) {
    return '[ ' +
      ctx.join(this.elements, ', ') +
      ' ]'
  }

  getLineLength () {
    if (this.useMultiline()) {
      return 1
    }

    const len = 4

    return this.elements.reduce((num, item) => {
      return num + item.getLineLength()
    }, len + (this.elements.length - 1) * 2)
  }
}

module.exports = ArrayExpression
