const FirescriptElement = require('./FirescriptElement')

/**
 * RestElement
 *
 * @class RestElement
 * @extends FirescriptElement
 *
 * interface RestElement {
 *   type: 'RestElement';
 *   argument: Identifier | BindingPattern;
 * }
 */
class RestElement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toFSString (ctx) {
    return this.renderElement(
      '...' +
      this.argument.toFSString(ctx)
    )
  }
}

module.exports = RestElement
