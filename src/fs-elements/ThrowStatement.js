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

  toFSString (ctx) {
    return this.renderElement(
      'throw ' +
      this.argument.toFSString(ctx)
    )
  }
}

module.exports = ThrowStatement
