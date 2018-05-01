const FireScriptElement = require('./FireScriptElement')

/**
 * RestElement
 *
 * @class RestElement
 * @extends FireScriptElement
 *
 * interface RestElement {
 *   type: 'RestElement';
 *   argument: Identifier | BindingPattern;
 * }
 */
class RestElement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toESString (ctx) {
    return this.renderElement(
      '...' +
      this.argument.toESString(ctx)
    )
  }
}

module.exports = RestElement
