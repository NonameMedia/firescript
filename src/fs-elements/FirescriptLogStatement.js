const FirescriptElement = require('./FirescriptElement')

/**
 * FirescriptLogStatement
 *
 * @class FirescriptLogStatement
 * @extends FirescriptElement
 *
 * interface FirescriptLogStatement {
    type: 'FirescriptLogStatement';
    arguments: [ Expression | null ];
}
*/
class FirescriptLogStatement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.arguments = this.createElementList(ast.arguments)
  }

  renderInline (ctx) {
    return this.renderElement(
      'log ' +
      ctx.join(this.arguments, ', ')
    )
  }

  renderMultiline (ctx) {
    const indention = ctx.indent(1)
    const args = ctx.join(this.arguments, ctx.indent())
    const outdent = ctx.indent(-1)

    return this.renderElement(
      'log' +
      indention +
      args +
      outdent
    )
  }

  toFSString (ctx) {
    return this.arguments.length > 2 ? this.renderMultiline(ctx) : this.renderInline(ctx)
  }
}

module.exports = FirescriptLogStatement
