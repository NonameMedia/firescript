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

  toESString (ctx) {
    const useMultiline = this.getLength() > 80
    if (useMultiline) {
      return this.renderElement(this.renderMultiline(ctx))
    } else {
      return this.renderElement(this.renderInline(ctx))
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
      alternate
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

  getLength () {
    return this.test.getLength +
      this.consequent.getLength() +
      this.alternate.getLength() +
      6
  }
}

module.exports = ConditionalExpression
