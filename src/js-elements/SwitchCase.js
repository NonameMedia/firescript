const JSElement = require('./JSElement')

/**
 * SwitchCase
 *
 * @class SwitchCase
 * @extends JSElement
 *
 * interface SwitchCase {
 *   type: 'SwitchCase';
 *   test: Expression;
 *   consequent: Statement[];
 * }
 */
class SwitchCase extends JSElement {
  constructor (ast) {
    super(ast)

    this.test = ast.test ? this.createElement(ast.test) : null
    this.consequent = this.createElementList(ast.consequent)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'case')
    buffer.write(this.callee)
    buffer.write('(')
    buffer.loop(this.arguments, ', ')
    buffer.write(')')
  }

  toESString (ctx) {
    const test = this.test ? 'case ' + this.test.toESString(ctx) : 'default'

    if (this.consequent.length === 0) {
      return this.renderElement(
        test +
        ':'
      )
    }

    const indent = ctx.indent(1)
    const consequent = ctx.join(this.consequent, ctx.indent())
    ctx.indent(-1)

    return this.renderElement(
      test +
      ':' +
      indent +
      consequent +
      '\n'
    )
  }
}

module.exports = SwitchCase
