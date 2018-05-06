const FireScriptElement = require('./FireScriptElement')

/**
 * SwitchStatement
 *
 * @class SwitchStatement
 * @extends FireScriptElement
 *
 * interface SwitchStatement {
 *   type: 'SwitchStatement';
 *   discriminant: Expression;
 *   cases: SwitchCase[];
 * }
 */
class SwitchStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.discriminant = this.createElement(ast.discriminant)
    this.cases = this.createElementList(ast.cases)
  }

  toFSString (ctx) {
    const discriminant = this.discriminant.toFSString(ctx)
    const indention = ctx.indent(1)
    const cases = ctx.each(this.cases, this.blockHandler, ctx.indent())
    ctx.indent(-1)

    return this.renderElement(
      'switch ' +
      discriminant +
      indention +
      cases +
      '\n'
    )
  }

  blockHandler (str, item, index, arr) {
    if (index + 1 === arr.length || item.consequent.length === 0) {
      return str
    }

    return str
  }
}

module.exports = SwitchStatement
