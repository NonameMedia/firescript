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
    if (this.test) {
      buffer.write('case ')
      buffer.write(this.test)
    } else {
      buffer.write('default')
    }

    buffer.write(':')

    if (this.consequent.length > 0) {
      buffer.indent(1)
      buffer.loop(this.consequent, buffer.getIndent())
      buffer.indent(-1, true)
      // buffer.nl()
    }
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
