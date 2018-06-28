const FirescriptElement = require('./FirescriptElement')

/**
 * ThrowStatement
 *
 * @class ThrowStatement
 * @extends FirescriptElement
 *
 * interface ThrowStatement {
 *   type: 'ThrowStatement';
 *   argument: Expression;
 * }
 */
class ThrowStatement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toFSString (ctx) {
    return this.renderElement(
      'throw ' +
      this.argument.toFSString(ctx)
    )
  }
}

module.exports = ThrowStatement
