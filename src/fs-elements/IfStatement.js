const FireScriptElement = require('./FireScriptElement')

/**
 * IfStatement
 *
 * @class IfStatement
 * @extends FireScriptElement
 *
 * interface IfStatement {
 *   type: 'IfStatement';
 *   test: Expression;
 *   consequent: Statement;
 *   alternate?: Statement;
 * }
 */
class IfStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.test = this.createElement(ast.test)
    this.consequent = this.createElement(ast.consequent)
    this.alternate = ast.alternate ? this.createElement(ast.alternate) : null
  }

  hasChildConsequent () {
    return this.alternate && this.alternate.type === 'IfStatement'
  }

  toFSString (ctx) {
    const elseBlockName = this.hasChildConsequent() ? 'el' : 'else'
    const alternate = this.alternate ? elseBlockName + this.alternate.toFSString(ctx) : ''

    return this.renderElement(
      'if ' +
      this.test.toFSString(ctx) +
      this.consequent.toFSString(ctx) +
      alternate
    )
  }
}

module.exports = IfStatement
