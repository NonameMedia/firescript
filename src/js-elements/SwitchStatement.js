const JSElement = require('./JSElement')

/**
 * SwitchStatement
 *
 * @class SwitchStatement
 * @extends JSElement
 *
 * interface SwitchStatement {
 *   type: 'SwitchStatement';
 *   discriminant: Expression;
 *   cases: SwitchCase[];
 * }
 */
class SwitchStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.discriminant = this.createElement(ast.discriminant)
    this.cases = this.createElementList(ast.cases)
  }

  toESString (ctx) {
    const indention = ctx.indent(1)
    const cases = ctx.each(this.cases, this.blockHandler, ctx.indent())
    const finalIndention = ctx.indent(-1)

    return this.renderElement(
      'switch (' +
      this.discriminant.toESString(ctx) +
      ') {' +
      indention +
      cases.trim() +
      finalIndention +
      '}'
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
