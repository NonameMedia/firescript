const FirescriptElement = require('./FirescriptElement')

/**
 * SwitchCase
 *
 * @class SwitchCase
 * @extends FirescriptElement
 *
 * interface SwitchCase {
 *   type: 'SwitchCase';
 *   test: Expression;
 *   consequent: Statement[];
 * }
 */
class SwitchCase extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.test = ast.test ? this.createElement(ast.test) : null
    this.consequent = this.createElementList(ast.consequent)
  }

  toFSString (ctx) {
    const test = this.test ? 'case ' + this.test.toFSString(ctx) : 'default'

    if (this.consequent.length === 0) {
      return this.renderElement(
        test
      )
    }

    const indent = ctx.indent(1)
    const consequent = ctx.join(this.consequent, ctx.indent())
    const outdent = ctx.indent(-1)

    return this.renderElement(
      test +
      indent +
      consequent +
      '\n'
    )
  }
}

module.exports = SwitchCase
