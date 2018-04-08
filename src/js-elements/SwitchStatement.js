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
    return this.renderElement(
      'switch (' +
      this.discriminant.toESString(ctx) +
      ') {' +
      ctx.indent(1) +
      ctx.each(this.cases, this.blockHandler, ctx.indent()) +
      ctx.indent(-1) +
      '}'
    )
  }

  blockHandler (str, item, index, arr) {
    if (index + 1 === arr.length || item.consequent.length === 0) {
      return str
    }

    return str + '\n'
  }
}

module.exports = SwitchStatement
