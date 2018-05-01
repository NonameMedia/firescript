const FireScriptElement = require('./FireScriptElement')

/**
 * ThrowStatement
 *
 * @class ThrowStatement
 * @extends FireScriptElement
 *
 * interface ThrowStatement {
 *   type: 'ThrowStatement';
 *   argument: Expression;
 * }
 */
class ThrowStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toESString (ctx) {
    return this.renderElement(
      'throw ' +
      this.argument.toESString(ctx)
    )
  }
}

module.exports = ThrowStatement
