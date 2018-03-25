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

  toESString (ctx) {
    const test = this.test ? 'case ' + this.test.toESString(ctx) : 'default'

    if (this.consequent.length === 0) {
      return test +
        ':'
    }

    const indent = ctx.indent(1)
    const consequent = ctx.join(this.consequent, ctx.indent())
    ctx.indent(-1)

    return test +
      ':' +
      indent +
      consequent
  }
}

module.exports = SwitchCase
