const JSElement = require('./JSElement')

/**
 * ConditionalExpression
 *
 * @class ConditionalExpression
 * @extends JSElement
 *
 * interface ConditionalExpression {
 *   type: 'ConditionalExpression';
 *   test: Expression;
 *   consequent: Statement;
 *   alternate?: Statement;
 * }
 */
class ConditionalExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.test = this.createElement(ast.test)
    this.consequent = this.createElement(ast.consequent)
    this.alternate = this.createElement(ast.alternate)
  }

  compile (buffer) {
    const useMultiline = this.getLineLength() > 80

    buffer.write(this.test)

    if (useMultiline) {
      buffer.indent(1)
      buffer.write('? ')
      buffer.write(this.consequent)
      buffer.indent()
      buffer.write(': ')
      buffer.write(this.alternate)
      buffer.indent(-1, true)
      buffer.nl()
    } else {
      buffer.write(' ? ')
      buffer.write(this.consequent)
      buffer.write(' : ')
      buffer.write(this.alternate)
    }
  }

  renderMultiline (ctx) {
    const test = this.test.toESString(ctx)
    const indention = ctx.indent(1)
    const consequent = this.consequent.toESString(ctx)
    const alternate = this.alternate.toESString(ctx)
    ctx.indent(-1)

    return test +
      indention +
      '? ' +
      consequent +
      indention +
      ': ' +
      alternate +
      '\n'
  }

  renderInline (ctx) {
    const test = this.test.toESString(ctx)
    const consequent = this.consequent.toESString(ctx)
    const alternate = this.alternate.toESString(ctx)

    return test +
      ' ? ' +
      consequent +
      ' : ' +
      alternate
  }

  getLineLength () {
    return this.test.getLineLength() +
      this.consequent.getLineLength() +
      this.alternate.getLineLength() +
      6
  }
}

module.exports = ConditionalExpression
