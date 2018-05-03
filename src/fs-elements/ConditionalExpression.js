const FireScriptElement = require('./FireScriptElement')

/**
 * ConditionalExpression
 *
 * @class ConditionalExpression
 * @extends FireScriptElement
 *
 * interface ConditionalExpression {
 *   type: 'ConditionalExpression';
 *   test: Expression;
 *   consequent: Statement;
 *   alternate?: Statement;
 * }
 */
class ConditionalExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.test = this.createElement(ast.test)
    this.consequent = this.createElement(ast.consequent)
    this.alternate = this.createElement(ast.alternate)
  }

  toFSString (ctx) {
    const useMultiline = this.getLength() > 80
    if (useMultiline) {
      return this.renderElement(this.renderMultiline(ctx))
    } else {
      return this.renderElement(this.renderInline(ctx))
    }
  }

  renderMultiline (ctx) {
    const test = this.test.toFSString(ctx)
    const indention = ctx.indent(1)
    const consequent = this.consequent.toFSString(ctx)
    const alternate = this.alternate.toFSString(ctx)
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
    const test = this.test.toFSString(ctx)
    const consequent = this.consequent.toFSString(ctx)
    const alternate = this.alternate.toFSString(ctx)

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
